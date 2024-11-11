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
            </nav>
            <p className="copy">&copy; 2024 Mon Site</p>
        </footer>
    );
};

export default Footer