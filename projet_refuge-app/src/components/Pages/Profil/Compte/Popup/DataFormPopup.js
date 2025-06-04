import React, { useState, useEffect } from 'react';
import api from '../../../../../services/api'; // Vérifie ce chemin
import { useAuth } from '../../../../../context/AuthContext'; // Vérifie ce chemin

const DataFormPopup = ({ onClose, user, onUpdateSuccess }) => {
    const { updateUserData } = useAuth(); // Fonction pour mettre à jour l'utilisateur dans le contexte
    const [formData, setFormData] = useState({
        prenom: user.prenom || '',
        nom: user.nom || '',
        email: user.email || '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await api.put('/auth/profile/data', formData);
            setMessage(response.data.msg || 'Données mises à jour avec succès !');
            setError('');
            updateUserData(response.data.user); // Met à jour l'utilisateur dans le contexte
            onUpdateSuccess(); // Informe le composant parent que la mise à jour a réussi
        } catch (err) {
            console.error("Erreur lors de la mise à jour des données:", err);
            setError(err.response?.data?.msg || 'Erreur lors de la mise à jour des données.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal">
                <div className="popup-header">
                    <h3>Modifier mes données personnelles</h3>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom:</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom:</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <div className="popup-footer">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DataFormPopup;