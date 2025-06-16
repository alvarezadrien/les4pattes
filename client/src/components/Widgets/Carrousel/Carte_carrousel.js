import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Carte_carrousel.css";

const Carte_carrousel = () => {
    const [animaux, setAnimaux] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/animaux`)
            .then((response) => response.json())
            .then((data) => {
                const animauxNonAdoptes = data.filter(animal => animal.adopte === false);
                setAnimaux(animauxNonAdoptes);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des animaux :", error);
            });
    }, []);

    const handleNext = () => {
        if (currentIndex + itemsPerPage >= animaux.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(Math.max(animaux.length - itemsPerPage, 0));
        } else {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    useEffect(() => {
        if (animaux.length > 0) {
            const autoScroll = setInterval(() => {
                handleNext();
            }, 3500);

            return () => clearInterval(autoScroll);
        }
    }, [currentIndex, animaux]);

    return (
        <div className="carrousel-container">
            <button onClick={handlePrev} className="carrousel-button prev">❮</button>

            <div className="carrousel-wrapper">
                <div
                    className="carrousel"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                    }}
                >
                    {animaux.map((animal, index) => (
                        <div key={`animal-${index}`} className="carrousel_card">
                            <img
                                className="card-image"
                                src={
                                    animal.image
                                        ? `${process.env.REACT_APP_API_URL}${animal.image}`
                                        : "/img/default.jpg"
                                }
                                alt={`Photo de ${animal.nom}`}
                            />
                            <div className="card-info">
                                <h3 className="h3card_info">{animal.nom}</h3>
                                <p>Âge : {animal.age}</p>
                                <p>Race : {animal.race}</p>
                                <p>Sexe : {animal.sexe}</p>
                                <button
                                    type="button"
                                    onClick={() => navigate(`/Ficheperso_animal/${animal._id}`)}
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={handleNext} className="carrousel-button next">❯</button>
        </div>
    );
};

export default Carte_carrousel;
