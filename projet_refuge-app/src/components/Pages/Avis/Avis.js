import React from 'react';
import './Avis.css';

const avisData = [
    {
        nom: "Sophie L.",
        commentaire: "Une expérience incroyable ! Merci au refuge pour leur accueil chaleureux.",
        note: 5
    },
    {
        nom: "Marc D.",
        commentaire: "Adoption fluide et équipe très attentionnée. Je recommande à 100% !",
        note: 4
    },
    {
        nom: "Julie R.",
        commentaire: "Un grand merci pour m'avoir permis d'adopter mon nouveau compagnon.",
        note: 5
    }
];

const Avis = () => {
    return (
        <section className="avis-section">
            <h2 className="avis-titre">✨ Ce que disent nos adoptants ✨</h2>
            <div className="avis-container">
                {avisData.map((avis, index) => (
                    <div key={index} className="avis-carte">
                        <div className="avis-header">
                            <div className="avis-avatar">{avis.nom.charAt(0)}</div>
                            <h3 className="avis-nom">{avis.nom}</h3>
                        </div>
                        <p className="avis-commentaire">“{avis.commentaire}”</p>
                        <div className="avis-stars">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < avis.note ? "star filled" : "star"}>★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Avis;
