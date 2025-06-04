// Avis.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Importe le composant Slider
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
                setComments(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des avis:", err);
                setError("Impossible de charger les avis. Veuillez réessayer plus tard.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    // Configuration de react-slick pour le carrousel
    const sliderSettings = {
        dots: true, // Affiche les points de navigation
        infinite: true, // Défilement infini
        speed: 500, // Vitesse de la transition
        slidesToShow: 3, // Affiche 3 cartes par ligne par défaut
        slidesToScroll: 1, // Défile d'une carte à la fois
        autoplay: true, // Lecture automatique
        autoplaySpeed: 3000, // Intervalle de lecture automatique (3 secondes)
        cssEase: "linear", // Type d'animation
        responsive: [ // Paramètres réactifs pour différentes tailles d'écran
            {
                breakpoint: 1024, // Pour les écrans de taille moyenne (tablettes)
                settings: {
                    slidesToShow: 2, // Affiche 2 cartes
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600, // Pour les petits écrans (mobiles)
                settings: {
                    slidesToShow: 1, // Affiche 1 carte
                    slidesToScroll: 1,
                    initialSlide: 1 // Commence au deuxième slide
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
            {/* Utilisation du composant Slider de react-slick */}
            <Slider {...sliderSettings} className="avis-list">
                {comments.map((comment) => (
                    <div key={comment._id || comment.id} className="avis-item-wrapper"> {/* Wrapper pour les marges du slider */}
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