import React, { useState } from 'react';
import api from '../../../../../services/api';

const CommentFormPopup = ({ onClose, onCommentSubmitSuccess }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0); // La note par défaut est 0
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            // Exemple d'appel API pour soumettre un commentaire
            // Vous devrez ajuster l'URL et les données envoyées selon votre backend
            const response = await api.post('/api/comments', {
                comment: commentText,
                rating: rating,
                // Vous pouvez ajouter d'autres champs si nécessaire (ex: orderId)
            });

            setSuccess('Commentaire soumis avec succès !');
            setCommentText('');
            setRating(0); // Réinitialise la note après soumission
            onCommentSubmitSuccess(); // Appelle la fonction de succès parent
            setTimeout(onClose, 1500); // Ferme le popup après un court délai
        } catch (err) {
            console.error("Erreur lors de la soumission du commentaire:", err);
            setError(err.response?.data?.msg || "Erreur lors de la soumission du commentaire.");
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