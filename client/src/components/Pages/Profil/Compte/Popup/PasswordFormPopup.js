import React, { useState } from 'react';

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
            const res = await fetch(`${API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Erreur lors du changement de mot de passe.');
            }

            setMessage(data.msg || 'Mot de passe mis à jour avec succès !');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
        } catch (err) {
            console.error("Erreur lors du changement de mot de passe:", err);
            setError(err.message);
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
