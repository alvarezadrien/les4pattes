import React from "react";
import { Link } from "react-router-dom";
import '../Fichegalerie.css'

const Fichegalerie = () => {
    const cat = [
        { name: "Diablo", age: "2 ans 1/2", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Bella", age: "1 an", race: "Lorem", Sexe: "Femelle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
        { name: "Max", age: "3 Ans", race: "Lorem", Sexe: "Mâle stérilisé", imgSrc: "/img/chat_galeriefiche.jpg" },
    ];

    return (
        <div className="page-container">

            <section className='container_appercu'>
                <div className='animal_group'>
                    {cat.map((cat, index) => (
                        <div className='item' key={`cat-${index}`}>
                            <img src={cat.imgSrc} alt={`Photo de ${cat.name}`} />
                            <div className='item_info'>
                                <h3>{cat.name}</h3>
                                <p className='age'>Âge: {cat.age}</p>
                                <span>Race: {cat.race}</span> <br />
                                <span>Sexe: {cat.sexe}</span> <br />
                                {/* <button type="button"><Link to={`/Ficheperso_animal/${cat.name}`} className="">Détails</Link></button> */}
                                <button type="button"><Link to={`/Ficheperso_animal`} className="">Détails</Link></button>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

    );
};

export default Fichegalerie