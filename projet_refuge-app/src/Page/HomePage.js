import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import Animalitem from './Animalitem';
import '../HomePage.css';
import Carte_carrousel from './Carte_carrousel';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    function redirectApropos() {
        console.log('Inside redirect A propos')
        navigate('/Apropos')
    }

    function redirectChien() {
        console.log('Inside redirect Chien')
        navigate('/Galeriechien')
    }

    function redirectChat() {
        console.log('Inside redirect Chat')
        navigate('/Galeriechat')
    }

    const images = [
        "/img/img_chienchat_container.jpg",
        "/img/images_chien_chat_imgadopt1.jpg",
        "/img/chien.jpg",
        "/img/pexels-guvo-29025330.jpg",
        "/img/chien\ chat\ .jpeg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className='Page_home'>
            {/* Div container intro */}
            <div className='container_img'>
                <h1 className='h1_titre'>Les 4 pattes <img src="/img/pattes_blanche.png" alt="" width={40} height={40} /></h1>

                <p className='paragraphe_container'>Notre association pour les animaux <br />
                    perdus et abandonnés, depuis <br />
                    plus de 100 ans en Belgique
                </p>

                <div className='circle_img0'>
                    <div className='circle_img1'>
                        <img src={images[currentImage]} alt="" width={360} height={350} />

                    </div>
                    <div className='circle_img2'>
                        <img src="/img/image chien.png" alt="" width={235} height={210} />
                    </div>
                    <div className='circle_img3'>
                        <img src="/img/images.jpeg" alt="" width={200} height={200} />
                    </div>
                </div>
                <button type='button' className='button_propos' onClick={redirectApropos}>À propos</button>
            </div>
            {/* Div container choix */}
            <div className='container_choix'>

                {/* <h3 className="h2_choix">Adopter un animal de compagnie</h3> */}

                <div className='container_choix1'>
                    <img src="/img/chien img choix.jpeg" alt="" width={300} height={300} onClick={redirectChien} />
                    <button className='button_choix_chiens' onClick={redirectChien}>Chiens</button>
                </div>
                <div className='container_choix2'>
                    <img src="/img/images.jpeg" alt="" width={300} height={300} onClick={redirectChat} />
                    <button className='button_choix_chats' onClick={redirectChat}>Chats</button>
                </div>
            </div>
            {/* Div leur maison */}
            <div className='leur_maison'>
                <span className='span_maison'>Ils ont trouvé une maison</span>
                <br />
                <span className='nombre'>18567</span>
                <img src="/img/hero-dog.png" alt="" width={280} height={280} />
            </div>

            {/* Importatiln code carte carrousel */}
            <div className='container_carte'>
                <h3 className='titre_carte'><img src="/img/pattes.png" alt="" width={40} height={40} /> Animaux à adopter <img src="/img/pattes.png" alt="" width={40} height={40} /></h3>

                <Carte_carrousel />
            </div>


            {/* Div home propos */}
            <div className='home_propos'>
                <h2> <img src="/img/pattes.png" alt="" width={40} height={40} />À propos de nous <img src="/img/pattes.png" alt="" width={40} height={40} /></h2>
                <br />
                <p className='paragraphe_home_propos'>L’association Protectrice des Animaux Les 4 pattes est l’une des plus <br />
                    anciennes sociétés de protection animale de Belgique. Nous hébergeons <br />
                    des chiens et chats dans notre centre  <br />
                    d’accueils à Bruxelles (Anderlecht) <br />
                    <br />
                    Nous accueillons en moyenne près de 100 chiens <br />
                    et chats par mois, victimes d’abandons. Nous <br />
                    prenons soin d’eux et nous efforçons de leur <br />
                    trouver des familles pour les adopter.</p>

                <div className='home_propos_img'>
                    <img src="/img/img_home_propos.jpg" alt="" />
                </div>
                <button type='button' onClick={redirectApropos} >Notre histoire</button>
            </div>

            {/* Div aides soins */}
            <div className='container_aides_soins'>
                <h2 className='h2_titre_soins'><img src="/img/pattes.png" alt="" width={40} height={40} />Nos aides et soins <img src="/img/pattes.png" alt="" width={40} height={40} /></h2>
                <div className='icon_ensemble'>
                    <div className='icon_soins1'>
                        <img src="/img/maison-pour-animaux-de-compagnie.png" alt="" width={200} height={200} />
                        <h2>L'accueil des animaux</h2>
                        <button>Voir plus</button>
                    </div>
                    <div className='icon_soins2'>
                        <img src="/img/sensibilisation.png" alt="" width={200} height={200} />
                        <h2>Sensibilisation</h2>
                        <button>Voir plus</button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default HomePage