import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Fiche_galeriechien = () => {
    const navigate = useNavigate();

    // Appel variable chiens
    const dogs = [
        { name: "Diablo", age: "2 ans 1/2", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_malinois_2.1.jpg" },
        { name: "Bella", age: "1 an", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_brun_1.2.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_noire_4.1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_petit_1.3.jpeg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_assis_1.1.jpeg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_terrier_1.2.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_berger_1.3.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_mali_1.1.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_iron_1.1.jpg" },
        { name: "Otto", age: "2 Ans", race: "American Stafforshire Terrier", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_staff_1.2.jpg" },
        { name: "Mila", age: "1 An 1/2", race: "Jack Russell", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_russell_1.1.jpg" },
        { name: "Achille", age: "4 Ans", race: "croisé, Dogue argentin nom", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_dogue_1.3.jpg" },

    ];

    return (
        <div className="page-container">
            <section className='container_appercu'>
                <div className='animal_group_chien'>
                    {dogs.map((dog, index) => (
                        <div className='item' key={`dog-${index}`}>
                            <img src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                            <div className='item_info'>
                                <h3>{dog.name}</h3>
                                <p className='age'>Âge: {dog.age}</p>
                                <span>Race: {dog.race}</span> <br />
                                <span>Sexe: {dog.sexe}</span> <br />
                                <button
                                    type="button"
                                    onClick={() => navigate(`/Ficheperso_animal`)}
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

    );
};

export default Fiche_galeriechien




