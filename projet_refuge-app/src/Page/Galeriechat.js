import React from 'react';
import Filtre from './Filtre';
import '../Galeriechat.css';
import Fichegalerie from './Fiche_galeriechat';
import Pagination from './Pagination';

const Galeriechat = () => {
    const totalPages = 5; // Définir le nombre total de pages ici

    return (
        <div className='container_galerie'>
            <div className='container_img_galerie'>

                <h1 className='h1_proteges'>Nos protégés</h1>

                <div className='divimg_principal'>
                    <div className='img_galerie1'>
                        <img src="/img/chien chat .jpeg" alt="" />
                    </div>
                    <div className='img_galerie2'>
                        <img src="/img/chat_galerie.jpg" alt="" />
                    </div>
                    <div className='img_galerie3'>
                        <img src="/img/img_chien_galerie.jpg" alt="" />
                    </div>
                    <div className='img_galerie4'>
                        <img src="/img/img_chat_galerie.jpg" alt="" />
                    </div>
                </div>
            </div>

            {/* Importation filtre */}
            <Filtre />

            {/* Importation Fichegalerie */}
            <Fichegalerie />

            {/* Importation Pagination avec le nombre total de pages */}
            <Pagination totalPages={totalPages} />
        </div>
    );
};

export default Galeriechat;
