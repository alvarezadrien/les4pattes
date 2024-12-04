import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer_haut">
                <div className="logo_footer">
                    <img src="/img/logo_refuge.png" alt="Logo du refuge les 4 pattes" />
                </div>

                <section className="icon_email_h2">
                    <h2 className="icon_email">
                        <img src="/img/email.png" alt="Icône email" />
                        <span>Contactez-nous</span>
                    </h2>
                    <ul className="liste_contact_footer">
                        <li><a href="tel:+32492764208">+32492764208</a></li>
                        <li><a href="mailto:adrienalvarez15@gmail.com">adrienalvarez15@gmail.com</a></li>
                        <li><address>Rue des papillons 245, 1070 Bruxelles</address></li>
                        <li>Numéro d'agrément: Db 452 21 302</li>
                    </ul>
                </section>

                <section className="icon_horaire_h2">
                    <h2 className="icon_horaire">
                        <img src="/img/horloge.png" alt="Icône horaire" />
                        <span>Horaire</span>
                    </h2>
                    <ul className="liste_horaire_footer">
                        <li>Lundi-Samedi: 10h à 16h sur rendez-vous au <a href="tel:0492764208">04/527.10.50</a></li>
                        <li>Fermé les dimanches et les jours fériés.</li>
                    </ul>
                </section>
            </section>

            <section className="footer_bas">
                <div className="card">
                    <span>Réseaux sociaux</span>
                    <a className="social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img className="social-image" src="/img/facebook.png" alt="Facebook" />
                    </a>
                    <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img className="social-image" src="/img/instagram.png" alt="Instagram" />
                    </a>
                    <a className="social-link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                        <img className="social-image" src="/img/youtube.png" alt="YouTube" />
                    </a>
                    <a className="social-link" href="https://x.com/?lang=fr" target="_blank" rel="noopener noreferrer">
                        <img className="social-image" src="/img/twitter.png" alt="X" />
                    </a>
                </div>

                <h5 className="h5_bancaire">BE 79 1140 2004 0000 3102 8079 8178</h5>
                <p className="copy">&copy; 2025 Refuge les 4 pattes (TFE)</p>
            </section>
        </footer>
    );
};

export default Footer;
