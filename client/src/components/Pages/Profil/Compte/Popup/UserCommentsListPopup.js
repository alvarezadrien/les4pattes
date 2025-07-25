import React from 'react';
import '../Mon_compte.css';

// Nouveau composant Popup pour lire la suite (déjà existant, mais inclus pour clarté si ce fichier était autonome)
const ReadMorePopup = ({ commentText, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-modal read-more-modal">
                <div className="popup-header">
                    <h3>Commentaire complet</h3>
                    <button onClick={onClose} className="close-popup-btn">&times;</button>
                </div>
                <div className="popup-body">
                    <p className="full-comment-text">{commentText}</p>
                </div>
                <div className="popup-buttons">
                    <button onClick={onClose} className="close-btn">Fermer</button>
                </div>
            </div>
        </div>
    );
};

const UserCommentsListPopup = ({ comments, onClose, onDeleteComment, onReadMoreClick }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-modal comments-list-modal">
                <div className="popup-header">
                    <h3>Vos avis</h3>
                    <button onClick={onClose} className="close-popup-btn">&times;</button>
                </div>
                <div className="popup-body">
                    {comments.length === 0 ? (
                        <p className="no-comments">Vous n'avez pas encore laissé d'avis.</p>
                    ) : (
                        <ul className="user-comments-list-popup"> {/* New class for comments in popup */}
                            {comments.map(comment => (
                                <li key={comment._id} className="comment-item-popup"> {/* New class for items in popup */}
                                    <div className="comment-text-content-popup" onClick={() => onReadMoreClick(comment.commentText)}>
                                        {comment.commentText.length > 100 ? (
                                            <>
                                                <p className="comment-text-truncated-popup">
                                                    {comment.commentText.substring(0, 100)}...
                                                </p>
                                                <button
                                                    className="read-more-btn-popup"
                                                    onClick={(e) => { e.stopPropagation(); onReadMoreClick(comment.commentText); }}
                                                >
                                                    Lire la suite
                                                </button>
                                            </>
                                        ) : (
                                            <p className="comment-text-popup">{comment.commentText}</p>
                                        )}
                                        <small className="comment-rating-popup">Note : {comment.rating} / 5</small>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDeleteComment(comment._id); }}
                                        className="delete-comment-btn-popup"
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="popup-buttons">
                    <button onClick={onClose} className="close-btn">Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default UserCommentsListPopup;