// Avis.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './Avis.css';

const Avis = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/comments');

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();

                // Élimine les doublons par texte (ou remplace par item._id si nécessaire)
                const uniqueComments = Array.from(
                    new Map(data.map(item => [item.commentText, item])).values()
                );

                setComments(uniqueComments);
            } catch (err) {
                console.error("Erreur lors de la récupération des avis:", err);
                setError("Impossible de charger les avis. Veuillez réessayer plus tard.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

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

    if (comments.length === 0) {
        return <div className="avis-container no-comments">Aucun avis pour le moment. Soyez le premier à commenter !</div>;
    }

    return (
        <div className="avis-section">
            <h2 className="avis-title">
                <img src="/img/pattes.png" alt="Patte" width={40} height={40} />
                Ce qu'ils disent de nous
                <img src="/img/pattes.png" alt="Patte" width={40} height={40} />
            </h2>
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
