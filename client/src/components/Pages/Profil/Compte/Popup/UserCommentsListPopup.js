import React, { useState } from 'react';
import '../Mon_compte.css';

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

const UserCommentsListPopup = ({
    comments,
    onClose,
    onDeleteComment,
    onReadMoreClick,
    onEditComment, // ✅ callback pour soumettre l'édition
    loading
}) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [editedRating, setEditedRating] = useState(5);

    const startEditing = (comment) => {
        setEditingCommentId(comment._id);
        setEditedText(comment.commentText);
        setEditedRating(comment.rating);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditedText('');
        setEditedRating(5);
    };

    const submitEdit = () => {
        if (editedText.trim() === '') return;
        onEditComment(editingCommentId, editedText, editedRating);
        cancelEditing();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-modal comments-list-modal">
                <div className="popup-header">
                    <h3>Vos avis</h3>
                    <button onClick={onClose} className="close-popup-btn">&times;</button>
                </div>
                <div className="popup-body">
                    {loading ? (
                        <p className="no-comments">Chargement de vos avis...</p>
                    ) : comments.length === 0 ? (
                        <p className="no-comments">Vous n'avez pas encore laissé d'avis.</p>
                    ) : (
                        <ul className="user-comments-list-popup">
                            {comments.map(comment => (
                                <li key={comment._id} className="comment-item-popup">
                                    {editingCommentId === comment._id ? (
                                        <div className="edit-comment-form-popup">
                                            <textarea
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                                rows="4"
                                                className="edit-comment-textarea"
                                            />
                                            <div className="edit-rating">
                                                Note :
                                                <select
                                                    value={editedRating}
                                                    onChange={(e) => setEditedRating(Number(e.target.value))}
                                                >
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="edit-buttons-popup">
                                                <button className="save-btn" onClick={submitEdit}>Enregistrer</button>
                                                <button className="cancel-btn" onClick={cancelEditing}>Annuler</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="comment-text-content-popup">
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
                                            <div className="comment-rating-popup">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < comment.rating ? '' : 'empty-star'}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="comment-actions-popup">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteComment(comment._id); }}
                                            className="delete-comment-btn-popup"
                                        >
                                            Supprimer
                                        </button>
                                        {editingCommentId !== comment._id && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); startEditing(comment); }}
                                                className="edit-comment-btn-popup"
                                            >
                                                Modifier
                                            </button>
                                        )}
                                    </div>
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
