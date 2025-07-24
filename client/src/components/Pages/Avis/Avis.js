import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
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

            // ✅ Élimine les doublons par (texte nettoyé + username nettoyé)
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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    if (loading) {
        return <div className="avis-container">Chargement des avis...</div>;
    }

    if (error) {
        return <div className="avis-container error-message">{error}</div>;
    }

    return (
        <div className="avis-section">
            <h2 className="avis-title">
                <img src="/img/pattes.png" alt="Patte" width={40} height={40} />
                Ce qu'ils disent de nous
                <img src="/img/pattes.png" alt="Patte" width={40} height={40} />
            </h2>

            {showPopup && (
                <CommentFormPopup
                    onClose={() => setShowPopup(false)}
                    onCommentSubmitSuccess={handleNewComment}
                />
            )}

            <Slider {...sliderSettings} className="avis-list">
                {comments.map((comment) => (
                    <div key={comment._id || comment.id} className="avis-item-wrapper">
                        <div className="avis-item">
                            <p className="avis-text">"{comment.commentText}"</p>
                            <div className="avis-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < comment.rating ? 'filled' : ''}`}>
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                            <p className="avis-author">- {comment.username}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Avis;
