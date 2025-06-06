import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';

const DemandeAdoptionPopup = ({ animalId, onClose, onAdoptionSubmitSuccess }) => {
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // Pour afficher les détails d'une demande
    const [showNewRequestForm, setShowNewRequestForm] = useState(false); // Pour afficher le formulaire de nouvelle demande

    const { token, user } = useAuth();

    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            if (!user || !token) {
                setError("Vous devez être connecté pour voir vos demandes.");
                return;
            }
            setLoading(true);
            setError('');
            try {
                // Assurez-vous que votre backend a un endpoint pour récupérer les demandes par utilisateur
                // et qu'il popule les données de l'animal.
                const response = await fetch(`http://localhost:5000/api/demandes-adoption/user/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Erreur lors du chargement des demandes d'adoption.");
                }

                const data = await response.json();
                setAdoptionRequests(data);
            } catch (err) {
                setError(err.message || "Une erreur inattendue est survenue lors du chargement.");
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, [user, token]); // Dépendances pour recharger si l'utilisateur ou le token changent

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
                    animal: animalId,
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

            const newRequest = await response.json(); // Récupère la nouvelle demande créée
            setSuccess("Votre demande d'adoption a été envoyée !");
            setMessageText('');
            setAdoptionRequests([...adoptionRequests, newRequest]); // Ajoute la nouvelle demande à la liste
            setSelectedRequest(newRequest); // Affiche directement la nouvelle demande
            setShowNewRequestForm(false); // Cache le formulaire de nouvelle demande
            onAdoptionSubmitSuccess?.(); // Exécute le callback si défini
            // setTimeout(onClose, 2000); // Optionnel: fermer après un délai, ou laisser l'utilisateur fermer
        } catch (err) {
            setError(err.message || "Une erreur inattendue est survenue.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedRequest(null);
        setShowNewRequestForm(false);
        setError('');
        setSuccess('');
        setMessageText('');
    };

    const handleShowNewRequestForm = () => {
        setShowNewRequestForm(true);
        setSelectedRequest(null); // Cache les détails d'une demande existante
        setMessageText(''); // Réinitialise le message pour la nouvelle demande
        setError('');
        setSuccess('');
    };

    if (loading && adoptionRequests.length === 0) {
        return (
            <div className="popup-overlay">
                <div className="popup-modal">
                    <p>Chargement de vos demandes d'adoption...</p>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>
            </div>
        );
    }

    return (
        <div className="popup-overlay">
            <div className="popup-modal large-popup"> {/* Ajout d'une classe pour un popup plus grand */}
                <div className="popup-header">
                    <h3>Mes demandes d'adoption</h3>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {selectedRequest ? (
                    <div className="request-details">
                        <button className="back-btn" onClick={handleBackToList}>Retour à la liste</button>
                        <h4>Détails de la demande pour {selectedRequest.animal?.nom || 'l\'animal'}</h4>
                        <p><strong>État du dossier:</strong> <span className={`status-tag status-${selectedRequest.status.replace(/\s/g, '-')}`}>{selectedRequest.status}</span></p>

                        {selectedRequest.animal && (
                            <div className="animal-info">
                                <h5>Informations sur l'animal :</h5>
                                <p><strong>Nom:</strong> {selectedRequest.animal.nom}</p>
                                <p><strong>Type:</strong> {selectedRequest.animal.type}</p>
                                <p><strong>Race:</strong> {selectedRequest.animal.race}</p>
                                <p><strong>Âge:</strong> {selectedRequest.animal.age} ans</p>
                                <p><strong>Description:</strong> {selectedRequest.animal.description}</p>
                                {selectedRequest.animal.photos && selectedRequest.animal.photos.length > 0 && (
                                    <img src={`http://localhost:5000${selectedRequest.animal.photos[0]}`} alt={selectedRequest.animal.nom} className="animal-thumb" />
                                )}
                            </div>
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
                                <p>Aucun message pour cette demande pour le moment.</p>
                            )}
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setLoading(true);
                                setError('');
                                setSuccess('');
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
                            }} className="new-message-form">
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
                ) : showNewRequestForm ? (
                    <form onSubmit={handleSubmitNewRequest} className="popup-form">
                        <h4>Envoyer une nouvelle demande d'adoption</h4>
                        {animalId && <p>Pour l'animal avec l'ID : <strong>{animalId}</strong></p>}
                        <div className="form-group">
                            <label htmlFor="message">Message au refuge :</label>
                            <textarea
                                id="message"
                                rows="5"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Envoi en cours..." : "Envoyer la demande"}
                        </button>
                        <button type="button" className="back-btn" onClick={handleBackToList}>Annuler</button>
                    </form>
                ) : (
                    <div className="adoption-requests-list">
                        {adoptionRequests.length > 0 ? (
                            <>
                                <h4>Vos demandes d'adoption en cours :</h4>
                                <ul className="request-items">
                                    {adoptionRequests.map((request) => (
                                        <li key={request._id} onClick={() => setSelectedRequest(request)} className="request-item">
                                            <span>Demande pour : <strong>{request.animal?.nom || 'Animal inconnu'}</strong></span>
                                            <span className={`status-tag status-${request.status.replace(/\s/g, '-')}`}>{request.status}</span>
                                            <span className="request-date">Créée le: {new Date(request.createdAt).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>Vous n'avez aucune demande d'adoption en cours.</p>
                        )}
                        {animalId && ( // Affiche le bouton "Nouvelle demande" seulement si un animalId est passé
                            <button className="new-request-btn" onClick={handleShowNewRequestForm}>
                                Envoyer une nouvelle demande pour cet animal
                            </button>
                        )}
                        {!animalId && ( // Affiche un bouton générique si aucun animalId n'est passé
                            <button className="new-request-btn" onClick={handleShowNewRequestForm}>
                                Faire une nouvelle demande d'adoption
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemandeAdoptionPopup;