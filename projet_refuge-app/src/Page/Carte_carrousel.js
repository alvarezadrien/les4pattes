import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Carte_carrousel.css";

const Carte_carrousel = () => {
    const dogs = [
        { name: "Milo", age: "2 Ans 1/2", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_blancroux_1.1.jpg" },
        { name: "Bella", age: "1 An", race: "Berger malinois", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_malinois_2.1.jpg" },
        { name: "Bogart", age: "3 Ans", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_blancnoir1.webp" },
        { name: "Lucky", age: "4 Ans", race: "American staff", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_brun_1.2.jpg" },
        { name: "Coco", age: "1 an 1/2", race: "Siamois", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechat/chat_siamois_1.2.jpg" },
        { name: "Lucy", age: "2 Ans", race: "Rottweiler", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_noire_4.1.jpg" },
        { name: "Rocky", age: "5 Ans", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_gris_1.2.jpg" },
        { name: "Daisy", age: "3 Ans", race: "Inconnu", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_petit_1.3.jpeg" },
        { name: "Buddy", age: "1 An", race: "Bengal", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_bengal_1.3.jpg" },
        { name: "Diablo", age: "2 Ans 1/2", race: "Inconnu", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_assis_1.1.jpeg" },
        { name: "Bella", age: "1 An", race: "Européen", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechat/chat_roux_1.1.jpg" },
        { name: "Chuck", age: "3 Ans", race: "Bull terrier", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_terrier_1.2.jpg" },
        { name: "Oreo", age: "1 An 1/2", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/oreo_1.2.jpg" },
        { name: "Dora", age: "2 Ans 1/2", race: "Berger Allemand", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_berger_1.3.jpg" },
        { name: "Casper", age: "2 Ans", race: "Européen", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechat/chat_blanc_1.3.jpg" },
        { name: "Rocky", age: "5 Ans", race: "Inconnu", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_mali_1.1.jpg" },
        { name: "Nala", age: "8 Mois", race: "ecaille de tortue", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechat/nala_1.1.jpg" },
        { name: "Buddy", age: "1 An", race: "Lorem", Sexe: "Mâle", imgSrc: "/img/img_galeriechien/chien_iron_1.1.jpg" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handleNext = () => {
        if (currentIndex + itemsPerPage >= dogs.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(dogs.length - itemsPerPage);
        } else {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

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
                    {dogs.map((dog, index) => (
                        <div key={`dog-${index}`} className="carrousel_card">
                            <img className="card-image" src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                            <div className="card-info">
                                <h3 className="h3card_info">{dog.name}</h3>
                                <p>Âge : {dog.age}</p>
                                <p>Race : {dog.race}</p>
                                <p>Sexe : {dog.Sexe}</p>
                                {/* <Link to={`/Ficheperso_animal/${dog.name}`} className="details-button">Détails</Link> */}
                                <Link to={`/Ficheperso_animal`} className="details-button">Détails</Link>
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
