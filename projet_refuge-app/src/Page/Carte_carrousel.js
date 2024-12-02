import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Carte_carrousel.css";

const Carte_carrousel = () => {
    const dogs = [
        { name: "Diablo", age: "2 ans 1/2", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/sydney-chat1.jpg" },
        { name: "Bella", age: "1 an", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Lucky", age: "4 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Milo", age: "6 Mois", race: "Lorem", Sexe: "Mâle", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Lucy", age: "2 Ans", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Rocky", age: "5 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Daisy", age: "3 Ans", race: "Lorem", Sexe: "Femelle", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Buddy", age: "1 An", race: "Lorem", Sexe: "Mâle", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Diablo", age: "2 ans 1/2", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/sydney-chat1.jpg" },
        { name: "Bella", age: "1 an", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Lucky", age: "4 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Milo", age: "6 Mois", race: "Lorem", Sexe: "Mâle", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Lucy", age: "2 Ans", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Rocky", age: "5 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Daisy", age: "3 Ans", race: "Lorem", Sexe: "Femelle", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Buddy", age: "1 An", race: "Lorem", Sexe: "Mâle", imgSrc: "/img/chien_fiche1.jpg" }
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
                                <Link to={`/Ficheperso_animal/${dog.name}`} className="details-button">Détails</Link>
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
