import React, { useState } from 'react';
import '../Mon_compte.css';

const MonCompte = () => {
    const [isFirstClick, setIsFirstClick] = useState(true);

    const changeImage = () => {
        const magazine1 = document.getElementById('magazine1');
        const magazine2 = document.getElementById('magazine2');

        if (isFirstClick) {
            const tempSrc = magazine1.src;
            magazine1.src = magazine2.src;
            magazine2.src = tempSrc;

            magazine2.style.width = '150px';
            magazine1.style.width = '100px';
            magazine1.style.transform = 'scale(0.8)';
            magazine2.style.transform = 'scale(1.2)';

            magazine1.style.order = 2;
            magazine2.style.order = 1;
        } else {
            const tempSrc = magazine1.src;
            magazine1.src = magazine2.src;
            magazine2.src = tempSrc;

            magazine1.style.width = '150px';
            magazine2.style.width = '100px';
            magazine1.style.transform = 'scale(1.2)';
            magazine2.style.transform = 'scale(0.8)';

            magazine1.style.order = 1;
            magazine2.style.order = 2;
        }

        setIsFirstClick(!isFirstClick);
    };

    return (
        <div className="page">
            <div className="circle_compte">
                <h4>Mon compte</h4>
                <span className="span1">Angelika Panczuk</span>
            </div>

            <ul className="ul_compte">
                <li>
                    <img src="/img/ressources.png" alt="Image 1" /> Gérer les données personnelles
                </li>
                <li>
                    <img src="/img/accueil (1).png" alt="Image 2" /> Adresse de livraison
                </li>
                <li>
                    <img src="/img/mot-de-passe (1).png" alt="Image 3" /> Modifier votre mot de passe
                </li>
                <li>
                    <img src="/img/deconnexion (1).png" alt="Image 4" /> Déconnexion
                </li>
            </ul>

            <div className="container_magazine">
                <span className="span2">Jy ai droit</span>

                <div className="container_img_magazine">
                    <img
                        className="magazine1"
                        src="/img/Magazine1.jpg"
                        id="magazine1"
                        onClick={changeImage}
                        alt="Magazine 1"
                    />
                    <img
                        className="magazine2"
                        src="/img/Magazine2.jpg"
                        id="magazine2"
                        onClick={changeImage}
                        alt="Magazine 2"
                    />
                </div>
            </div>
        </div>
    );
};

export default MonCompte;
