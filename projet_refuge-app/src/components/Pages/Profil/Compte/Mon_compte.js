import React, { useState, useEffect } from "react";
import "./Mon_compte.css";

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
  // Récupération des données user depuis localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    nom: "Nom",
    prenom: "Prénom",
    avatar: "/img/avatar.png"
  };

  const [avatar, setAvatar] = useState(storedUser.avatar || "/img/avatar.png");
  const [showPopup, setShowPopup] = useState(false);
  const [userNom, setUserNom] = useState(storedUser.nom);
  const [userPrenom, setUserPrenom] = useState(storedUser.prenom);

  // Choix d'un avatar
  const handleAvatarSelect = (img) => {
    setAvatar(img);
    setShowPopup(false);

    const updatedUser = { ...storedUser, avatar: img };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Gestion des options
  const handleOptionClick = (option) => {
    switch (option) {
      case "donnees":
        alert("Ici tu peux ajouter la gestion des données personnelles");
        break;
      case "adresse":
        alert("Ici tu peux ajouter la gestion de l'adresse de livraison");
        break;
      case "motdepasse":
        alert("Ici tu peux ajouter la modification du mot de passe");
        break;
      case "deconnexion":
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Déconnecté !");
        window.location.href = "/connexion";
        break;
      default:
        break;
    }
  };

  return (
    <div className="mon-compte-container">
      <div className="compte-background">
        <div className="compte-left">
          <div className="user-info">
            <img
              src={avatar}
              alt="Avatar"
              className="user-avatar clickable"
              onClick={() => setShowPopup(true)}
            />
            <div className="user-names">
              <span className="user-fullname">{userPrenom} {userNom}</span>
            </div>
          </div>

          <div className="intro-texte">
            Bienvenue sur votre espace personnel dédié à la gestion de votre compte dans notre refuge pour chiens et chats.
          </div>
        </div>

        <div className="compte-right">
          <div className="compte-options-grid">
            <div className="compte-option">
              <ul className="ul_compte">
                <li onClick={() => handleOptionClick("donnees")}>
                  <img src="/img/ressources.png" alt="Données personnelles" /> Gérer les données personnelles
                </li>
                <li onClick={() => handleOptionClick("adresse")}>
                  <img src="/img/accueil (1).png" alt="Adresse" /> Adresse de livraison
                </li>
                <li onClick={() => handleOptionClick("motdepasse")}>
                  <img src="/img/mot-de-passe (1).png" alt="Mot de passe" /> Modifier votre mot de passe
                </li>
                <li onClick={() => handleOptionClick("deconnexion")}>
                  <img src="/img/deconnexion (1).png" alt="Déconnexion" /> Déconnexion
                </li>
              </ul>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <img src="/img/magazine.png" alt="Magazine" className="option-img" />
                <span>Notre magazine</span>
              </div>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <img src="/img/orders.png" alt="Commandes" className="option-img" />
                <span>Mes commandes</span>
              </div>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <img src="/img/support.png" alt="Support" className="option-img" />
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
              <button onClick={() => setShowPopup(false)} className="close-btn">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonCompte;
