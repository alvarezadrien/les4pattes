import React, { useState } from 'react';
import '../PopupMenu.css';

const PopupMenu = () => {
    const [showPopup, setShowPopup] = useState(null);

    const handleMouseEnter = (index) => {
        setShowPopup(index);
    };

    const handleMouseLeave = () => {
        setShowPopup(null);
    };

    const handleClickProposition = (proposition) => {
        console.log("Proposition sélectionnée:", proposition);
    };

    const options = [
        { title: "Animaux", propositions: ["Témoin de cruauté animale ?", "Conditions d'adoption", "Nos compagnons adopté"] },
        { title: "Adoption", propositions: ["Formulaire d'adoption", "Infos sur l'adoptant"] },
        { title: "Membres", propositions: ["Notre équipe", "Adhésions", "Nos partenaires"] },
        { title: "Contact" }
    ];

    return (
        <ul className='ul_pop'>
            {options.map((option, index) => (
                <li className='li_pop'
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}>
                    {option.title === "Contact" ? (
                        // Ajouter un lien pour "Contact"
                        <a href="/contact" className="contact-link">Contact</a>
                    ) : (
                        <>
                            {option.title}
                            {showPopup === index && option.propositions && (
                                <div className="popup">
                                    {option.propositions.map((prop, i) => (
                                        <h5 key={i} onClick={() => handleClickProposition(prop)}>
                                            {prop}
                                        </h5>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default PopupMenu;
