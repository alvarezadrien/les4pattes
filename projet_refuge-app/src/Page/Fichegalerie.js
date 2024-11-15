import React from "react";
import '../Fichegalerie.css'

const Fichegalerie = () => {
    // Appel variable chiens
    const dogs = [
        { name: "Diablo", age: "2 ans 1/2", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Bella", age: "1 an", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chien_fiche1.jpg" },
    ];

    return (
        <div className="page-container">
            <section className='container_appercu'>
                <div className='animal_group'>
                    {dogs.map((dog, index) => (
                        <div className='item' key={`dog-${index}`}>
                            <img src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                            <div className='item_info'>
                                <h3>{dog.name}</h3>
                                <p className='age'>Âge: {dog.age}</p>
                                <span>Race: {dog.race}</span> <br />
                                <span>Sexe: {dog.sexe}</span> <br />
                                <button type='button'>Détails</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

    );
};

export default Fichegalerie