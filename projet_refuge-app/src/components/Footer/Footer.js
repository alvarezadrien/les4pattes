import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <nav className="footer">
                <div className="logo_footer">
                    <img src="/img/logo_refuge.png" alt="" width={180} height={180}/>
                </div>
                <div className="icon_email_h2">
                    <h2  className="icon_email"><img src="/img/email.png" alt=""/>Contactez-nous</h2>
                </div>    

                <ul className="liste_contact_footer">
                    <li><a href="tel:+32492764208">+32492764208</a></li>
                    <li><a href="mailto:adrienalvarez15@gmail.com">adrienalvarez15@gmail.com</a></li>
                    <li><address>Rue des papillons 245, 1070 Bruxelles</address></li>
                    <li>Numéro d'agrément: Db 452 21 302</li>
                </ul>

                <div className="icon_horaire_h2">
                    <h2><img src="/img/horloge.png" alt="" />Horaires</h2>
                </div>

                <ul className="liste_horaire_footer">
                    <li>Lundi-Samedi: 10h à 16h sur</li>
                    <li>rendez-vous au <a href="tel:0492764208">04/527.10.50</a></li>
                    <li>Fermé les dimanches et les jours fériés.</li>
                </ul>

                <div className="reseaux_sociaux">
                    <h3>Nos réseaux sociaux: </h3>

                    <ul className="liste_sociaux">
                        <li><img src="/img/facebook.png" alt="" /></li>
                        <li><img src="/img/instagram.png" alt="" /></li>
                        <li><img src="/img/youtube.png" alt="" /></li>
                    </ul>
                </div>
                <h5 className="h5_bancaire">BE 79 1140 2004 0000 3102 8079 8178</h5>
            </nav>
            <p className="copy">&copy; 2025 Refuge les 4 pattes (TFE)</p>
        </footer>
    );
};

export default Footer