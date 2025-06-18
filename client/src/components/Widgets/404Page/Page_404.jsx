import React from "react";
import "./Page_404.css";

const Page404 = () => {
  return (
    <div className="container-404">
      <span className="paw-print">🐾</span>
      <div className="status-code">404</div>
      <h1>Oups, cette page s’est éclipsée !</h1>
      <p>
        Il semble que la page que vous recherchez ait pris la poudre
        d’escampette.
        <br />
        Pas de panique, même les meilleurs compagnons se perdent parfois.
      </p>
      <span className="animal-icon">🐶🐱</span>
      <p>
        Explorez d'autres sentiers pour retrouver nos adorables pensionnaires :
      </p>
      <div className="buttons">
        <a href="/" className="btn btn-primary">
          🏠 Retour à la maison
        </a>
        <a href="/adopter" className="btn btn-secondary">
          ❤️ Adoptez un ami
        </a>
        <a href="/faire-un-don" className="btn btn-tertiary">
          🎁 Faire un don
        </a>
      </div>
      <p className="footer-cta">
        Chaque clic est une caresse de plus pour nos animaux. Merci pour votre
        soutien !
      </p>
    </div>
  );
};

export default Page404;
