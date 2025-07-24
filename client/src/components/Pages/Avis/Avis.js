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

            // Supprimer les doublons : même texte ET même auteur
            const uniqueMap = new Map();
            data.forEach((comment) => {
                const key = `${comment.username}-${comment.commentText}`;
                if (!uniqueMap.has(key)) {
                    uniqueMap.set(key, comment);
                }
            });

            setComments(Array.from(uniqueMap.values()));
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
        const key = `${newComment.username}-${newComment.commentText}`;
        setComments(prev => {
            const exists = prev.some(c => `${c.username}-${c.commentText}` === key);
            return exists ? prev : [newComment, ...prev];
        });
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
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
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
    