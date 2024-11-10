import React from 'react'
import '../HomePage.css';
import Navbar from '../components/Navbar/Navbar'

const HomePage = () => {
    return (
        <div className='container_img'>
            <Navbar />
            <h1>Les 4 pattes</h1>

            <p className='paragraphe_container'>Notre association pour les animaux <br />
                perdus et abandonnés, depuis <br />
                plus de 100 ans en Belgique
            </p>
            <br />

            <div className='circle_img'>
                <img src="/img/img_chienchat_container.jpg" alt="" width={280} height={325} />

            </div>
        </div>

    )
}

export default HomePage