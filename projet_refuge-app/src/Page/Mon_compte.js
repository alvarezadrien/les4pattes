import React, { useState } from 'react';
import '../Mon_compte.css';

const MonCompte = () => {
    const [isFirstClick, setIsFirstClick] = useState(true);

    const [image1Src, setImage1Src] = useState("/img/Magazine1.jpg");
    const [image2Src, setImage2Src] = useState("/img/Magazine2.jpg");

    const [image1Style, setImage1Style] = useState({
        width: '150px',
        transform: 'scale(1.2)',
        order: 1
    });

    const [image2Style, setImage2Style] = useState({
        width: '100px',
        transform: 'scale(0.8)',
        order: 2
    });

    const changeImage = () => {
        if (isFirstClick) {
            setImage1Src("/img/Magazine2.jpg");
            setImage2Src("/img/Magazine1.jpg");

            setImage1Style({
                width: '100px',
                transform: 'scale(0.8)',
                order: 2
            });

            setImage2Style({
                width: '150px',
                transform: 'scale(1.2)',
                order: 1
            });
        } else {
            setImage1Src("/img/Magazine1.jpg");
            setImage2Src("/img/Magazine2.jpg");

            setImage1Style({
                width: '150px',
                transform: 'scale(1.2)',
                order: 1
            });

            setImage2Style({
                width: '100px',
                transform: 'scale(0.8)',
                order: 2
            });
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
                        src={image1Src}
                        style={image1Style}
                        onClick={changeImage}
                        alt="Magazine 1"
                    />
                    <img
                        className="magazine2"
                        src={image2Src}
                        style={image2Style}
                        onClick={changeImage}
                        alt="Magazine 2"
                    />
                </div>
            </div>
        </div>
    );
};

export default MonCompte;
