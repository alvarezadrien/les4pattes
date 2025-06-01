import React from 'react';
import Filtre from '../../../Widgets/Filtres/Filtre';
import './Galeriechat.css';
import Fichegalerie from '../Fiche/Fiche_galeriechat';

const Galeriechat = () => {
    const totalPages = 5; // Nombre total de pages
    const images = [
        { src: "/img/chien chat .jpeg", alt: "Chien et chat ensemble" },
        { src: "/img/chat_galerie.jpg", alt: "Chat dans la galerie" },
        { src: "/img/img_chien_galerie.jpg", alt: "Chien dans la galerie" },
        { src: "/img/img_chat_galerie.jpg", alt: "Chat dans la galerie" }
    ];

    return (
        <div className='container_galerie'>
            <div className='container_img_galerie'>
                <h1 className='h1_proteges'>Nos protégés</h1>

                <div className='divimg_principal'>
                    {images.map((image, index) => (
                        <div key={index} className={`img_galerie img_galerie${index + 1}`}>
                            <img src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            </div>

            <Filtre />
            <Fichegalerie />
        </div>
    );
};

export default Galeriechat;
