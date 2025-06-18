import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const PasswordFormPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
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

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError('Le nouveau mot de passe et sa confirmation ne correspondent pas.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(`${API_URL}/api/auth/profile`, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(response.data.msg || 'Mot de passe mis à jour avec succès !');
            setError('');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
        } catch (err) {
            console.error("Erreur lors du changement de mot de passe:", err);
            setError(err.response?.data?.msg || 'Erreur lors du changement de mot de passe.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal">
                <div className="popup-header">
                    <h3>Modifier mon mot de passe</h3>
                    <button className="close-popup-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Mot de passe actuel:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Nouveau mot de passe:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirmer le nouveau mot de passe:</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <div className="popup-footer">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordFormPopup;
