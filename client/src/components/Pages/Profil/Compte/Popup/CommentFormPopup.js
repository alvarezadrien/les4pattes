import React, { useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';

const CommentFormPopup = ({ onClose, onCommentSubmitSuccess }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { token } = useAuth();

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
                }),
            });

            if (!response.ok) {
                let errorMessage = `Erreur du serveur (Statut: ${response.status}).`;
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.msg || errorData.message || errorMessage;
                    } catch (jsonParseError) {
                        errorMessage = `Erreur: Réponse JSON malformée du serveur (Statut: ${response.status}).`;
                    }
                } else {
                    const textResponse = await response.text();
                    if (textResponse.startsWith('<!DOCTYPE html>')) {
                        errorMessage = "Le serveur a renvoyé une page HTML inattendue au lieu de JSON. Vérifiez l'URL de l'API ou le routage côté serveur.";
                    } else if (textResponse) {
                        errorMessage = textResponse;
                    }
                }
                throw new Error(errorMessage);
            }

            const successContentType = response.headers.get('content-type');
            if (successContentType && successContentType.includes('application/json')) {
                await response.json();
            }

            setSuccess('Commentaire soumis avec succès !');
            setCommentText('');
            setRating(0);
            onCommentSubmitSuccess();
            setTimeout(onClose, 1500);
        } catch (err) {
            console.error("Erreur lors de la soumission du commentaire:", err);
            if (err.message.includes("autorisée") || err.message.includes("401")) {
                setError("Session expirée ou non autorisée. Veuillez vous reconnecter.");
            } else {
                setError(err.message || "Une erreur inattendue est survenue lors de la soumission du commentaire.");
            }
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
