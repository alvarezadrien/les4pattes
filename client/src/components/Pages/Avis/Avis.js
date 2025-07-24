import React, { useEffect, useState, useCallback } from 'react';
import CommentFormPopup from '../../Pages/Profil/Compte/Popup/CommentFormPopup';
import './Avis.css';

const Avis = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            const data = await response.json();

            const seen = new Set();
            const uniques = [];

            for (const comment of data) {
                const key = `${comment.username?.trim().toLowerCase()}-${comment.commentText?.trim().toLowerCase()}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniques.push(comment);
                }
            }

            setComments(uniques);
        } catch (err) {
            console.error("Erreur lors de la récupération des avis:", err);
            setError("Impossible de charger les avis. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleNewComment = (newComment) => {
        const key = `${newComment.username?.trim().toLowerCase()}-${newComment.commentText?.trim().toLowerCase()}`;
        const alreadyExists = comments.some(c => {
            const existingKey = `${c.username?.trim().toLowerCase()}-${c.commentText?.trim().toLowerCase()}`;
            return existingKey === key;
        });

        if (!alreadyExists) {
            setComments(prev => [newComment, ...prev]);
        }
    };

    const getAvatarUrl = (avatar) => {
        if (!avatar) {
            return '/img/avatar_comment.png';
        }
        if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
            return avatar;
        }
        return `${process.env.REACT_APP_API_URL}/${avatar}`;
    };

    if (loading) return <div className="avis-section">Chargement des avis...</div>;
    if (error) return <div className="avis-section error-message">{error}</div>;

    return (
        <div className="avis-section">
            <h2 className="avis-title">Ce qu'ils disent de nous</h2>

            {showPopup && (
                <CommentFormPopup
                    onClose={() => setShowPopup(false)}
                    onCommentSubmitSuccess={handleNewComment}
                />
            )}

            <div className="avis-grid-v2">
                {comments.map((comment) => (
                    <div key={comment._id || comment.id} className="avis-card-v2">
                        <div className="avis-avatar-wrapper">
                            <img
                                src={getAvatarUrl(comment.avatar)}
                                alt="Avatar utilisateur"
                                className="avis-avatar"
                            />
                        </div>

                        <div className="avis-card-body">
                            <p className="avis-texte">{comment.commentText}</p>
                            <p className="avis-nom">{comment.username}</p>
                            <div className="avis-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < comment.rating ? 'filled' : ''}`}>&#9733;</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="add-comment-button" onClick={() => setShowPopup(true)}>
                Ajouter un avis
            </button>
        </div>
    );
};

export default Avis;
