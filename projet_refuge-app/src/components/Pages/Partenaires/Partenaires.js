import React from 'react';
import './Partenaires.css';

const logos = [
    { src: "/img/logo_partenaires/logo_Nestle-Purina.jpg", link: "https://www.purina.com" },
    { src: "/img/logo_partenaires/logo_pedigree.png", link: "https://www.pedigree.fr" },
    { src: "/img/logo_partenaires/logo-maxizoo.jpg", link: "https://www.maxizoo.fr" },
    { src: "/img/logo_partenaires/friskies-logo-comp.jpg", link: "https://www.friskies.com" },
    { src: "/img/logo_partenaires/logo_nestle-good.jpg", link: "https://www.nestle.com" },
    { src: "/img/logo_partenaires/whiskas-logo.png", link: "https://www.whiskas.fr" },
];

const Partenaires = () => {
    return (
        <div className='page_partenaires'>
            <div className='container_img_partenaires'>
                <h1 className='h1_partenaires'>Nos partenaires</h1>
            </div>

            <div className='container_logo_partenaires'>
                <ul className='img_logo'>
                    {logos.map((logo, index) => (
                        <li key={index}>
                            <a href={logo.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={logo.src}
                                    alt={`Logo partenaire ${index + 1}`}
                                    className='logo_image'
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Partenaires;
