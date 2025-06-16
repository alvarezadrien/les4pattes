import React, { useState, useEffect } from 'react';
import api from '../../../../../services/api'; // Vérifie ce chemin
import { useAuth } from '../../../../../context/AuthContext'; // Vérifie ce chemin

const AddressFormPopup = ({ onClose, user, onUpdateSuccess }) => {
    const { updateUserData } = useAuth();
    const [formData, setFormData] = useState({
        rue: user.adresse?.rue || '',
        ville: user.adresse?.ville || '',
        codePostal: user.adresse?.codePostal || '',
        pays: user.adresse?.pays || '',
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
            const response = await api.put('/auth/profile/address', formData);
            setMessage(response.data.msg || 'Adresse mise à jour avec succès !');
            setError('');
            updateUserData(response.data.user); // Met à jour l'utilisateur dans le contexte avec la nouvelle adresse
            onUpdateSuccess();
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'adresse:", err);
            setError(err.response?.data?.msg || "Erreur lors de la mise à jour de l'adresse.");
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal">
                <div className="popup-header">
                    <h3>Modifier mon adresse de livraison</h3>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="form-group">
                        <label htmlFor="rue">Rue:</label>
                        <input
                            type="text"
                            id="rue"
                            name="rue"
                            value={formData.rue}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ville">Ville:</label>
                        <input
                            type="text"
                            id="ville"
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codePostal">Code Postal:</label>
                        <input
                            type="text"
                            id="codePostal"
                            name="codePostal"
                            value={formData.codePostal}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pays">Pays:</label>
                        <input
                            type="text"
                            id="pays"
                            name="pays"
                            value={formData.pays}
                            onChange={handleChange}
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

export default AddressFormPopup;