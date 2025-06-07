import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';

import './DemandeAdoptionPopup.css';

const DemandeAdoptionPopup = ({ animalId, onClose, onAdoptionSubmitSuccess }) => {
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // Pour afficher les détails d'une demande
    const [shelterNews, setShelterNews] = useState([]); // État pour les nouvelles du refuge

    const { token, user } = useAuth();

    // Effet pour charger les demandes d'adoption et les nouvelles du refuge
    useEffect(() => {
        const fetchData = async () => {
            if (!user || !token) {
                setError("Vous devez être connecté pour voir vos demandes.");
                return;
            }
            setLoading(true);
            setError('');

            try {
                // Récupération des demandes d'adoption de l'utilisateur
                const requestsResponse = await fetch(`http://localhost:5000/api/demandes-adoption/user/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!requestsResponse.ok) {
                    const errorData = await requestsResponse.json();
                    throw new Error(errorData.message || "Erreur lors du chargement des demandes d'adoption.");
                }

                const requestsData = await requestsResponse.json();
                setAdoptionRequests(requestsData);

                // --- Simulation de la récupération des nouvelles du refuge ---
                // En production, vous feriez un appel API réel ici :
                // const newsResponse = await fetch('http://localhost:5000/api/shelter-news', { headers: { Authorization: `Bearer ${token}` } });
                // if (!newsResponse.ok) { /* handle error */ }
                // const newsData = await newsResponse.json();
                // setShelterNews(newsData);
                setShelterNews([
                    { id: 1, title: "Journée Portes Ouvertes !", date: "01/06/2025", content: "Venez rencontrer nos adorables pensionnaires ce samedi de 10h à 16h." },
                    { id: 2, title: "Besoin de bénévoles", date: "28/05/2025", content: "Nous recherchons des bénévoles pour les promenades des chiens et le nettoyage des chatteries." },
                    { id: 3, title: "Collecte de dons pour l'hiver", date: "15/05/2025", content: "Nous lançons une collecte de couvertures et de nourriture pour préparer nos animaux à l'hiver." },
                ]);
                // --- Fin de la simulation ---

            } catch (err) {
                setError(err.message || "Une erreur inattendue est survenue lors du chargement.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, token]); // Les dépendances assurent un rechargement si l'utilisateur ou le token changent

    // Gérer l'envoi d'une nouvelle demande d'adoption
    const handleSubmitNewRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!messageText.trim()) {
            setError("Veuillez écrire un message pour accompagner votre demande.");
            setLoading(false);
            return;
        }

        if (!animalId) {
            setError("Aucun animal sélectionné pour cette nouvelle demande.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/demandes-adoption', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: user._id,
                    animal: animalId, // animalId doit être passé au composant pour créer une demande spécifique
                    messages: [
                        {
                            sender: 'user',
                            text: messageText,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'envoi de la demande.");
            }

            const newRequest = await response.json(); // Le backend doit renvoyer l'objet complet avec l'animal populé
            setSuccess("Votre demande d'adoption a été envoyée !");
            setMessageText('');
            // Ajoute la nouvelle demande à la liste et la sélectionne pour affichage
            setAdoptionRequests([...adoptionRequests, newRequest]);
            setSelectedRequest(newRequest);
            onAdoptionSubmitSuccess?.(); // Exécute le callback si défini
        } catch (err) {
            setError(err.message || "Une erreur inattendue est survenue.");
        } finally {
            setLoading(false);
        }
    };

    // Gérer l'envoi d'un nouveau message dans une demande existante
    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        if (!messageText.trim()) {
            setError("Veuillez écrire un message.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/demandes-adoption/${selectedRequest._id}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sender: 'user',
                    text: messageText,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'envoi du message.");
            }
            const updatedRequest = await response.json();
            setSuccess("Message envoyé !");
            setMessageText('');
            setSelectedRequest(updatedRequest); // Met à jour la demande sélectionnée avec le nouveau message
        } catch (err) {
            setError(err.message || "Erreur lors de l'envoi du message.");
        } finally {
            setLoading(false);
        }
    };

    // Affichage de chargement initial
    if (loading && adoptionRequests.length === 0 && shelterNews.length === 0) {
        return (
            <div className="popup-overlay">
                <div className="popup-modal">
                    <p>Chargement de vos informations...</p>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>
            </div>
        );
    }

    return (
        <div className="popup-overlay">
            <div className="popup-modal large-popup multi-panel-layout"> {/* Ajout de classes pour le layout */}
                <div className="popup-header">
                    <h3>Mon Espace Adoptions</h3>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="content-grid">
                    {/* Colonne 1 : Mes Demandes d'Adoption */}
                    <div className="requests-column">
                        <h4>Vos demandes d'adoption</h4>
                        {adoptionRequests.length > 0 ? (
                            <ul className="request-items-list">
                                {adoptionRequests.map((request) => (
                                    <li
                                        key={request._id}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`request-summary-item ${selectedRequest?._id === request._id ? 'active-request' : ''}`}
                                    >
                                        <div className="request-summary-header">
                                            <span>Pour : <strong>{request.animal?.nom || 'Animal inconnu'}</strong></span>
                                            <span className={`status-tag status-${request.status.replace(/\s/g, '-')}`}>{request.status}</span>
                                        </div>
                                        <span className="request-date">Créée le: {new Date(request.createdAt).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Vous n'avez aucune demande d'adoption en cours.</p>
                        )}

                        {/* Formulaire de nouvelle demande affiché conditionnellement si un animalId est passé */}
                        {animalId && (
                            <div className="new-request-form-section">
                                <h4>Envoyer une nouvelle demande</h4>
                                <p>Pour l'animal avec l'ID : <strong>{animalId}</strong></p>
                                <form onSubmit={handleSubmitNewRequest} className="popup-form">
                                    <div className="form-group">
                                        <label htmlFor="message">Votre message au refuge :</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Exprimez votre intérêt pour cet animal et parlez de votre foyer."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="submit-btn" disabled={loading}>
                                        {loading ? "Envoi en cours..." : "Envoyer la demande"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Colonne 2 : Détails de la Demande et Messages */}
                    <div className="details-and-messages-column">
                        {selectedRequest ? (
                            <div className="request-details">
                                <h4>Détails de la demande sélectionnée</h4>
                                <p><strong>État du dossier:</strong> <span className={`status-tag status-${selectedRequest.status.replace(/\s/g, '-')}`}>{selectedRequest.status}</span></p>

                                {selectedRequest.animal ? (
                                    <div className="animal-info-card">
                                        <h5>Informations sur l'animal :</h5>
                                        <div className="animal-details-content">
                                            {selectedRequest.animal.photos && selectedRequest.animal.photos.length > 0 && (
                                                <img src={`http://localhost:5000${selectedRequest.animal.photos[0]}`} alt={selectedRequest.animal.nom} className="animal-thumb-detail" />
                                            )}
                                            <div className="animal-text-info">
                                                <p><strong>Nom:</strong> {selectedRequest.animal.nom}</p>
                                                <p><strong>Type:</strong> {selectedRequest.animal.type}</p>
                                                <p><strong>Race:</strong> {selectedRequest.animal.race}</p>
                                                <p><strong>Âge:</strong> {selectedRequest.animal.age} ans</p>
                                                <p><strong>Description:</strong> {selectedRequest.animal.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="info-message">Informations sur l'animal non disponibles ou chargement en cours.</p>
                                )}

                                <div className="messages-section">
                                    <h5>Historique des messages :</h5>
                                    {selectedRequest.messages && selectedRequest.messages.length > 0 ? (
                                        <div className="messages-list">
                                            {selectedRequest.messages.map((msg, index) => (
                                                <div key={index} className={`message-item ${msg.sender}`}>
                                                    <span className="sender-name">{msg.sender === 'user' ? 'Moi' : 'Le refuge'} :</span>
                                                    <p>{msg.text}</p>
                                                    <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="info-message">Aucun message pour cette demande pour le moment.</p>
                                    )}
                                    <form onSubmit={handleSendMessage} className="new-message-form">
                                        <textarea
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Écrire un nouveau message au refuge..."
                                            rows="3"
                                            required
                                        ></textarea>
                                        <button type="submit" disabled={loading}>
                                            {loading ? "Envoi..." : "Envoyer message"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="no-selection-message">
                                <p>Sélectionnez une demande dans la liste pour voir ses détails et communiquer avec le refuge.</p>
                            </div>
                        )}
                    </div>

                    {/* Colonne 3 : Actualités du refuge */}
                    <div className="news-column">
                        <h4>Actualités du refuge</h4>
                        {shelterNews.length > 0 ? (
                            <ul className="news-list">
                                {shelterNews.map((newsItem) => (
                                    <li key={newsItem.id} className="news-item-card">
                                        <h5>{newsItem.title}</h5>
                                        <p className="news-date">Publié le: {newsItem.date}</p>
                                        <p>{newsItem.content}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="info-message">Aucune actualité du refuge pour le moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemandeAdoptionPopup;