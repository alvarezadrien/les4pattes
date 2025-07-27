import React, { useEffect } from "react";
import "./Paiement_succes.css";

function PaiementSucces() {
  useEffect(() => {
    const happyAnimal = document.getElementById("happyAnimal");
    if (happyAnimal) {
      happyAnimal.style.opacity = "0";
      setTimeout(() => {
        happyAnimal.style.opacity = "1";
      }, 100);
    }

    const exploreBtn = document.getElementById("exploreBtn");
    const shareBtn = document.getElementById("shareBtn");

    if (exploreBtn) {
      exploreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Merci d'explorer davantage notre refuge !");
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const shareText =
          "Je viens de faire un don qui change des vies dans un refuge animalier ! Chaque geste compte. #SauvezDesVies #ProtectionAnimale";
        const shareUrl = window.location.href;

        if (navigator.share) {
          navigator
            .share({
              title: "Mon don pour les animaux !",
              text: shareText,
              url: shareUrl,
            })
            .then(() => console.log("Partage réussi !"))
            .catch((error) => {
              console.error("Erreur de partage :", error);
              alert(
                "Oups ! Votre navigateur ne supporte pas le partage direct. Copiez ce message pour partager votre action :\n\n" +
                  shareText +
                  "\n" +
                  shareUrl
              );
            });
        } else {
          prompt(
            "Copiez ce message pour partager votre générosité :",
            shareText + " " + shareUrl
          );
          alert("Merci d'avoir partagé !");
        }
      });
    }
  }, []);

  return (
    <div className="background-animation">
      <div className="container">
        <div className="header">
          <div className="checkmark-circle">
            <i className="fas fa-check"></i>
          </div>
          <h1 className="main-title">Merci, merci, merci !</h1>
          <p className="subtitle">
            Votre générosité est un rayon de soleil pour nos protégés.
          </p>
        </div>

        <div className="impact-section">
          <div className="impact-card">
            <i className="fas fa-hand-holding-heart icon-large"></i>
            <h2>Un avenir plus doux</h2>
            <p>
              Grâce à vous, des animaux maltraités ou abandonnés retrouvent
              espoir et dignité.
            </p>
          </div>
          <div className="impact-card">
            <i className="fas fa-bone icon-large"></i>
            <h2>Des ventres bien remplis</h2>
            <p>
              Votre don assure des repas nutritifs et le bien-être quotidien de
              chaque pensionnaire.
            </p>
          </div>
          <div className="impact-card">
            <i className="fas fa-first-aid icon-large"></i>
            <h2>Des soins essentiels</h2>
            <p>
              Vous financez des consultations vétérinaires vitales et des
              médicaments pour les plus fragiles.
            </p>
          </div>
        </div>

        <div className="animal-visual">
          <img
            src="https://via.placeholder.com/200/FFD700/FFFFFF?text=Animal+Sauv%C3%A9"
            alt="Un animal heureux grâce à votre don"
            className="happy-animal"
            id="happyAnimal"
          />
          <div className="hearts-particles">
            <span className="heart-particle">❤️</span>
            <span className="heart-particle">🐾</span>
            <span className="heart-particle">✨</span>
          </div>
        </div>

        <div className="message-box">
          <p>
            Chaque geste compte et transforme des vies. C'est grâce à des
            personnes comme vous que nous pouvons continuer notre mission.
          </p>
          <p className="call-to-action-text">
            Explorez comment votre impact se multiplie :
          </p>
        </div>

        <div className="actions">
          <a href="/" className="btn primary-btn" id="exploreBtn">
            <i className="fas fa-arrow-alt-circle-right"></i> Découvrir notre
            refuge
          </a>
          <a href="/" className="btn secondary-btn" id="shareBtn">
            <i className="fas fa-share-alt"></i> Partager cette bonne action
          </a>
        </div>

        <div className="social-proof">
          <p>
            "Voir ces animaux retrouver la joie est la plus belle des
            récompenses. Merci pour tout !"
          </p>
          <div className="testimonial-author">- L'équipe du Refuge</div>
        </div>
      </div>
    </div>
  );
}

export default PaiementSucces;
