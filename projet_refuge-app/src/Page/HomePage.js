import React from 'react'
import '../HomePage.css';
import Navbar from '../components/Navbar/Navbar'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            {/* Div container intro */}
            <div className='container_img'>
                <h1 className='h1_titre'>Les 4 pattes <img src="/img/carte_pointer.png" alt="" width={40} height={40} /></h1>

                <p className='paragraphe_container'>Notre association pour les animaux <br />
                    perdus et abandonnés, depuis <br />
                    plus de 100 ans en Belgique
                </p>
                <br />

                <div className='circle_img0'>
                    <div className='circle_img1'>
                        <img src="/img/img_chienchat_container.jpg" alt="" width={280} height={290} />

                    </div>
                    <div className='circle_img2'>
                        <img src="/img/chien.jpg" alt="" width={235} height={210} />
                    </div>
                    <div className='circle_img3'>
                        <img src="/img/images.jpeg" alt="" width={200} height={200} />
                    </div>
                </div>
                <button type='button' className='button_propos'>À propos</button>
            </div>
            {/* Div container choix */}
            <div className='container_choix'>
                <div className='container_choix1'>
                    <img src="/img/chien img choix.jpeg" alt="" width={300} height={280}/>
                    <button className='button_choix_chiens'>Chiens</button>
                </div>
                <div className='container_choix2'>
                    <img src="/img/images.jpeg" alt="" width={300} height={280}/>
                    <button className='button_choix_chats'>Chats</button>
                </div>          
            </div>
            {/* Div leur maison */}
            <div className='leur_maison'>
                <h2>Ils ont trouvé une maison</h2>
                <span className='nombre'>18567</span>
                <img src="/img/hero-dog.png" alt="" width={280} height={280}/>
            </div>
            <br /><br /> <br />
            {/* Div animaux à adopter */}
            <div className='animaux_adopt'>
                <h2>Animaux à adopter</h2>
                <section className='container_appercu'>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button>Détails</button>
                        </div>
                    </div>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button>Détails</button>
                        </div>
                    </div>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button>Détails</button>
                        </div>
                    </div>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button>Détails</button>
                        </div>
                    </div>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button>Détails</button>
                        </div>
                    </div>
                    <div className='item'>
                        <img src="/img/chien_fiche1.jpg" alt=""/>
                        <div className='item_info'>
                            <h3>Diablo</h3>
                            <p className='age'>âge: 2 ans 1/2</p> <br />
                            <span>Race: Lorem</span> <br />
                            <span>sexe: mâle stérilisée</span> <br />
                            <button type='button'>Détails</button>
                        </div>
                    </div>
                </section>
                <button className='button_plus'>Plus d'animaux</button>
            </div>

        </div>

    );
};

export default HomePage