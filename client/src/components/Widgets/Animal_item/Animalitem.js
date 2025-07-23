import React from "react";
import "./Animalitem.css";

const Animalitem = () => {
    const base = process.env.REACT_APP_API_URL.replace(/\/+$/, "");

    const dogs = [
        {
            name: "Diablo",
            age: "2 ans 1/2",
            race: "Lorem",
            Sexe: "Mâle stérilisé",
            imgSrc: `${base}/uploads/Chiens/tyson_1.1.jpg`,
        },
        {
            name: "Bella",
            age: "1 an",
            race: "Lorem",
            Sexe: "Femelle stérilisé",
            imgSrc: `${base}/uploads/Chiens/tyson_1.2.jpg`,
        },
        {
            name: "Max",
            age: "3 Ans",
            race: "Lorem",
            Sexe: "Mâle stérilisé",
            imgSrc: `${base}/uploads/Chiens/tyson_1.3.jpg`,
        },
    ];

    const cats = [
        {
            name: "Luna",
            age: "2 ans",
            race: "Lorem",
            Sexe: "Femelle stérilisé",
            imgSrc: `${base}/uploads/Chats/chat1.jpg`,
        },
        {
            name: "Neko",
            age: "1 an",
            race: "Lorem",
            Sexe: "Mâle stérilisé",
            imgSrc: `${base}/uploads/Chats/chat2.jpg`,
        },
        {
            name: "Mimi",
            age: "4 ans",
            race: "Lorem",
            Sexe: "Femelle stérilisé",
            imgSrc: `${base}/uploads/Chats/chat3.jpg`,
        },
    ];

    return (
        <section className="container_appercu">
            <div className="animal_group">
                {dogs.map((dog, index) => (
                    <div className="item" key={`dog-${index}`}>
                        <img src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                        <div className="item_info">
                            <h3>{dog.name}</h3>
                            <p className="age">Âge: {dog.age}</p>
                            <span>Race: {dog.race}</span> <br />
                            <span>Sexe: {dog.Sexe}</span> <br />
                            <button type="button">Détails</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="animal_group">
                {cats.map((cat, index) => (
                    <div className="item" key={`cat-${index}`}>
                        <img src={cat.imgSrc} alt={`Photo de ${cat.name}`} />
                        <div className="item_info">
                            <h3>{cat.name}</h3>
                            <p className="age">Âge: {cat.age}</p>
                            <span>Race: {cat.race}</span> <br />
                            <span>Sexe: {cat.Sexe}</span> <br />
                            <button type="button">Détails</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Animalitem;
