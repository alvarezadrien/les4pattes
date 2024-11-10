import React from 'react'
import '../HomePage.css';
import Navbar from '../components/Navbar/Navbar'

const HomePage = () => {
    return (
        <div className='container_img'>
            <Navbar />
            <h1 className='h1_titre'>Les 4 pattes</h1>

            <p className='paragraphe_container'>Notre association pour les animaux <br />
                perdus et abandonnés, depuis <br />
                plus de 100 ans en Belgique
            </p>
            <br />

            <div className='circle_img0'>
                <div className='circle_img1'>
                    <img src="/img/img_chienchat_container.jpg" alt="" width={280} height={305} />

                </div>
                <div className='circle_img2'>
                    <img src="/img/chien.jpg" alt="" width={235} height={210}/>
                </div>
                <div className='circle_img3'>
                    <img src="/img/images.jpeg" alt="" width={210} height={210}/>
                </div>
            </div>
            <button type='button' className='button_propos'>à propos</button>
        </div>

    )
}

export default HomePage