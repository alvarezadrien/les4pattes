import React, { useState } from "react";
import "./Mon_compte.css";

// Tableau simple avec les chemins des avatars
const avatarOptions = [
  "/img/Avatar/avatar_chat1.jpg",
  "/img/Avatar/avatar_chat2.jpg",
  "/img/Avatar/avatar_chat3.jpg",
  "/img/Avatar/avatar_chat4.jpg",
  "/img/Avatar/avatar_chien1.jpg",
  "/img/Avatar/avatar_chien2.jpg",
  "/img/Avatar/avatar_chien3.jpg",
  "/img/Avatar/avatar_chien4.jpg",
];

const MonCompte = () => {
  const [avatar, setAvatar] = useState("/img/avatar.png");
  const [showPopup, setShowPopup] = useState(false);

  const handleAvatarClick = () => {
    setShowPopup(true);
  };

  const handleAvatarSelect = (img) => {
    setAvatar(img);
    setShowPopup(false);
  };

  return (
    <>
      <div className="mon-compte-container">
        <div className="compte-background">
          <div className="compte-left">
            <div className="user-info">
              <img
                src={avatar}
                alt="Avatar"
                className="user-avatar clickable"
                onClick={handleAvatarClick}
              />
              <div className="user-names">
                <span className="user-nom">Angelika</span>
                <span className="user-prenom">Panczuk</span>
              </div>
            </div>

            <div className="intro-texte">
              Bienvenue sur votre espace personnel dédié à la gestion de votre
              compte dans notre refuge pour chiens et chats.
            </div>
          </div>
          <div className="compte-right">
            <div className="compte-options-grid">
              <div className="compte-option">
                <ul className="ul_compte">
                  <li>
                    <img src="/img/ressources.png" alt="Image 1" /> Gérer les
                    données personnelles
                  </li>
                  <li>
                    <img src="/img/accueil (1).png" alt="Image 2" /> Adresse de
                    livraison
                  </li>
                  <li>
                    <img src="/img/mot-de-passe (1).png" alt="Image 3" />{" "}
                    Modifier votre mot de passe
                  </li>
                  <li>
                    <img src="/img/deconnexion (1).png" alt="Image 4" />{" "}
                    Déconnexion
                  </li>
                </ul>
              </div>

              <div className="compte-option">
                <div className="option-content">
                  <img
                    src="/img/magazine.png"
                    alt="Statistiques"
                    className="option-img"
                  />
                  <span>Notre magazine</span>
                </div>
              </div>

              <div className="compte-option">
                <div className="option-content">
                  <img
                    src="/img/orders.png"
                    alt="Commandes"
                    className="option-img"
                  />
                  <span>Mes commandes</span>
                </div>
              </div>

              <div className="compte-option">
                <div className="option-content">
                  <img
                    src="/img/support.png"
                    alt="Support"
                    className="option-img"
                  />
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="avatar-popup">
            <div className="popup-content">
              <h3>Choisissez votre avatar</h3>
              <div className="avatar-options">
                {avatarOptions.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`avatar-${index}`}
                    onClick={() => handleAvatarSelect(img)}
                    className="avatar-option"
                  />
                ))}
              </div>
              <div className="popup-buttons">
                <button
                  onClick={() => setShowPopup(false)}
                  className="close-btn"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    alert("Avatar enregistré !");
                    setShowPopup(false);
                  }}
                  className="close-btn"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MonCompte;
