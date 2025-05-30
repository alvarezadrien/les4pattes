import React from "react";
import './Compagnons_adopter.css';

const Compagnons_adopter = () => {
    const animaux = [
        { nom: "Diablo", sexe: "Mâle", age: "3 ans", description: "Depuis son adoption, Diablo a trouvé sa place dans une famille aimante. Il s'adapte bien à son nouveau foyer et aime passer du temps à jouer avec ses jouets. C'est un chat calme et affectueux, toujours prêt pour une caresse.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Félix", sexe: "Mâle", age: "4 ans", description: "Félix est un chat tranquille qui aime les longues siestes au soleil. Il s'entend bien avec d'autres animaux et est très affectueux.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Diablo", sexe: "Mâle", age: "3 ans", description: "Depuis son adoption, Diablo a trouvé sa place dans une famille aimante. Il s'adapte bien à son nouveau foyer et aime passer du temps à jouer avec ses jouets. C'est un chat calme et affectueux, toujours prêt pour une caresse.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Félix", sexe: "Mâle", age: "4 ans", description: "Félix est un chat tranquille qui aime les longues siestes au soleil. Il s'entend bien avec d'autres animaux et est très affectueux.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Diablo", sexe: "Mâle", age: "3 ans", description: "Depuis son adoption, Diablo a trouvé sa place dans une famille aimante. Il s'adapte bien à son nouveau foyer et aime passer du temps à jouer avec ses jouets. C'est un chat calme et affectueux, toujours prêt pour une caresse.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Félix", sexe: "Mâle", age: "4 ans", description: "Félix est un chat tranquille qui aime les longues siestes au soleil. Il s'entend bien avec d'autres animaux et est très affectueux.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" },
        { nom: "Minette", sexe: "Femelle", age: "2 ans", description: "Minette adore grimper partout et explorer son environnement. Elle est pleine d'énergie et adore interagir avec les gens, surtout quand il s'agit de jouer.", image: "/img/chat_galeriefiche.jpg" }
    ];

    const renderCard = (animal) => (
        <div className="item_flip-card" key={animal.nom}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={animal.image} alt={`Photo de ${animal.nom}`} />
                    <h3>{animal.nom}</h3>
                </div>
                <div className="flip-card-back">
                    <p className="animal-description">
                        {animal.description}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page_compagnons">
            {/* Titre centré */}
            <h1 className="h1_compagnons"><img src="/img/pattes.png" alt="" width={40} height={40} /> Nos compagnons adoptés <img src="/img/pattes.png" alt="" width={40} height={40} /></h1>

            <section className="container_compagnons">
                <div className="animal_group_compagnons">
                    {animaux.map(renderCard)} {/* Génère les cartes */}
                </div>
            </section>
        </div>
    );
};

export default Compagnons_adopter;
