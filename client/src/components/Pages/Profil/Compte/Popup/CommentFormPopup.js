import React, { useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';

const CommentFormPopup = ({ onClose, onCommentSubmitSuccess }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { token, user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (rating === 0) {
            setError("Veuillez donner une note en sélectionnant une étoile.");
            setLoading(false);
            return;
        }

        try {
            if (!token) {
                setError("Vous devez être connecté pour laisser un commentaire.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    commentText: commentText,
                    rating: rating,
                    username: user?.prenom || "Utilisateur"
                }),
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Erreur serveur (${response.status})`;
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    const text = await response.text();
                    if (text.startsWith('<!DOCTYPE html>')) {
                        errorMessage = "Le serveur a renvoyé une page HTML au lieu d'une réponse JSON. Vérifiez l'URL de l'API.";
                    } else {
                        errorMessage = text;
                    }
                }
                throw new Error(errorMessage);
            }

            await response.json();
            setSuccess('Commentaire soumis avec succès !');
            setCommentText('');
            setRating(0);
            onCommentSubmitSuccess();
            setTimeout(onClose, 1500);
        } catch (err) {
            console.error("Erreur lors de la soumission du commentaire:", err);
            setError(err.message || "Une erreur est survenue lors de l'envoi du commentaire.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal">
                <div className="popup-header">
                    <h3>Laisser un commentaire</h3>
                    <button className="close-popup-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="form-group">
                        <label htmlFor="comment">Votre commentaire :</label>
                        <textarea
                            id="comment"
                            rows="5"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Votre note :</label>
                        <div className="star-rating">
                            {[5, 4, 3, 2, 1].map((starValue) => (
                                <React.Fragment key={starValue}>
                                    <input
                                        type="radio"
                                        id={`star-${starValue}`}
                                        name="rating"
                                        value={starValue}
                                        checked={rating === starValue}
                                        onChange={() => setRating(starValue)}
                                    />
                                    <label htmlFor={`star-${starValue}`} title={`${starValue} étoile${starValue > 1 ? 's' : ''}`}></label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Envoi en cours...' : 'Envoyer le commentaire'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentFormPopup;