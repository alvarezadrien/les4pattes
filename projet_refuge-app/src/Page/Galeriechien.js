import React from 'react'
import Filtre from './Filtre'
import '../Galeriechien.css'

const Galeriechien = () => {
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

            {/* Div filtre */}

                <Filtre />

        </div>
    );
};

export default Galeriechien