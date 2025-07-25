import React, { useEffect, useState, useCallback } from 'react';
import CommentFormPopup from '../../Pages/Profil/Compte/Popup/CommentFormPopup';
import './Avis.css'; // Ensure this path is correct

// SVG for a subtle paw print icon (still used in cards)
const PawPrintIcon = () => (
    <svg className="paw-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.45 2.14L9.1 4.5c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l2.35-2.35c.39-.39.39-1.02 0-1.41L12.86 2.14c-.39-.39-1.02-.39-1.41 0zM19.78 6.45c-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41l2.35 2.35c.39.39 1.02.39 1.41 0l1.41-1.41c-.39-.39.39-1.02 0-1.41L19.78 6.45zM4.22 6.45L2.81 7.86c-.39.39-.39 1.02 0 1.41l2.35 2.35c.39.39 1.02.39 1.41 0l1.41-1.41c-.39-.39-.39-1.02 0-1.41L4.22 6.45zM12 9c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
    </svg>
);

const MAX_REVIEW_LENGTH = 70; // FURTHER REDUCED: Max characters before truncating

const Avis = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCommentFormPopup, setShowCommentFormPopup] = useState(false);
    const [selectedReviewText, setSelectedReviewText] = useState(null);

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
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
            console.error("Error fetching reviews:", err);
            setError("Could not load stories. Please try again later.");
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
        if (!avatar || avatar.trim() === '') return null;
        if (avatar.startsWith('http://') || avatar.startsWith('https://')) return avatar;
        return `${process.env.REACT_APP_API_URL}${avatar.startsWith('/') ? '' : '/'}${avatar}`;
    };

    const openFullReviewPopup = (text) => {
        setSelectedReviewText(text);
        document.body.classList.add('no-scroll'); // Add class to body to prevent scrolling
    };

    const closeFullReviewPopup = () => {
        setSelectedReviewText(null);
        document.body.classList.remove('no-scroll'); // Remove class to enable scrolling
    };

    if (loading) return <div className="refuge-testimonials-section loading-state">Loading heartwarming stories...</div>;
    if (error) return <div className="refuge-testimonials-section error-state">{error}</div>;

    return (
        <section className="refuge-testimonials-section">
            <div className="section-content-wrapper-refuge">
                <div className="section-header-refuge">
                    <p className="section-overline-refuge">Our Family Stories</p>
                    <h2 className="section-title-refuge">Heartfelt Journeys</h2>
                    <p className="section-description-refuge">
                        Every adoption creates a beautiful new chapter. Hear directly from those who've opened their hearts and homes.
                    </p>
                </div>

                {showCommentFormPopup && (
                    <CommentFormPopup
                        onClose={() => setShowCommentFormPopup(false)}
                        onCommentSubmitSuccess={handleNewComment}
                    />
                )}

                {selectedReviewText && (
                    <div className="full-review-popup-overlay" onClick={closeFullReviewPopup}>
                        <div className="full-review-popup-content" onClick={e => e.stopPropagation()}>
                            <button className="close-popup-button" onClick={closeFullReviewPopup}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <h3 className="popup-title">Full Story</h3>
                            <p className="full-review-text-fullview">{selectedReviewText}</p>
                        </div>
                    </div>
                )}

                <div className="stories-grid-refuge">
                    {comments.map((comment) => {
                        const avatarUrl = getAvatarUrl(comment.avatar);
                        const isLongReview = comment.commentText.length > MAX_REVIEW_LENGTH;
                        const displayedText = isLongReview
                            ? comment.commentText.substring(0, MAX_REVIEW_LENGTH) + '...'
                            : comment.commentText;

                        return (
                            <div key={comment._id || comment.id} className="happy-story-card">
                                <div className="card-top-left-header">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={`Avatar of ${comment.username}`}
                                            className="adopter-avatar-refuge"
                                        />
                                    ) : (
                                        <div className="adopter-avatar-placeholder-refuge">
                                            {comment.username ? comment.username.charAt(0).toUpperCase() : '?'}{comment.username && comment.username.split(' ')[1] ? comment.username.split(' ')[1].charAt(0).toUpperCase() : ''}
                                        </div>
                                    )}
                                    <div className="adopter-info-refuge">
                                        <h3 className="adopter-name-refuge">{comment.username}</h3>
                                        <div className="story-rating-refuge">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`star-refuge ${i < comment.rating ? 'filled' : ''}`}>&#9733;</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="story-text-refuge">{displayedText}</p>
                                {isLongReview && (
                                    <button
                                        className="read-more-button"
                                        onClick={() => openFullReviewPopup(comment.commentText)}
                                    >
                                        Read More
                                    </button>
                                )}
                                <PawPrintIcon />
                            </div>
                        );
                    })}
                </div>

                <button className="share-story-button-refuge" onClick={() => setShowCommentFormPopup(true)}>
                    Share Your Happy Story!
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Avis;    