import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_content">
        {/* Logo à gauche */}
        <div className="logo_footer">
          <Link to="/"> {/* Utilisez Link pour la navigation */}
            <img
              className="logo_site_footer"
              src="/img/logo_site.svg"
              alt="Logo site"
            />
          </Link>
        </div>

        {/* Conteneur des sections Email et Horaire */}
        <div className="contact_horaire_container">
          <section className="icon_email_h2">
            <h2 className="icon_email">
              <img src="/img/email.png" alt="Icône email" />
              <span>Contactez-nous</span>
            </h2>
            <ul className="liste_contact_footer">
              <li>
                <a href="tel:+32492764208">+32492764208</a>
              </li>
              <li>
                <a href="mailto:adrienalvarez15@gmail.com">
                  adrienalvarez15@gmail.com
                </a>
              </li>
              <li>
                <address>Rue des papillons 245, 1070 Bruxelles</address>
              </li>
              <li>Numéro d'agrément: Db 452 21 302</li>
            </ul>
          </section>

          {/* Ligne verticale de séparation */}
          <div className="separator"></div>

          <section className="icon_horaire_h2">
            <h2 className="icon_horaire">
              <img src="/img/horloge.png" alt="Icône horaire" />
              <span>Horaire</span>
            </h2>
            <ul className="liste_horaire_footer">
              <li>
                Lundi-Samedi: 10h à 16h sur rendez-vous au{" "}
                <a href="tel:0492764208">04/527.10.50</a>
              </li>
              <li>Fermé les dimanches et les jours fériés.</li>
            </ul>
          </section>
        </div>
        <div className="separator"></div>
      </div>


      <div className="footer_bas">
        <div className="card">
          <span>Réseaux sociaux</span>
          <a
            className="social-link"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-image"
              src="/img/facebook.png"
              alt="Facebook"
            />
          </a>
          <a
            className="social-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-image"
              src="/img/instagram.png"
              alt="Instagram"
            />
          </a>
          <a
            className="social-link"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-image"
              src="/img/youtube.png"
              alt="YouTube"
            />
          </a>
          <a
            className="social-link"
            href="https://x.com/?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-image" src="/img/twitter.png" alt="X" />
          </a>
        </div>
        <h5 className="h5_bancaire">BE 79 1140 2004 0000 3102 8079 8178</h5>
        {/* Copyright */}
        <div className="footer_copyright">
          <p>© 2025 Refuge les 4 pattes (TFE)</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;