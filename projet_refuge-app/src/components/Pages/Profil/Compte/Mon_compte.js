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
  const defaultUser = {
    nom: "Nom",
    prenom: "Prénom",
    avatar: "",
    id: null,
  };

  const initialUser = JSON.parse(localStorage.getItem("user")) || defaultUser;

  const [avatar, setAvatar] = useState(initialUser.avatar || "/img/avatar.png");
  const [showPopup, setShowPopup] = useState(false);
  const [userNom, setUserNom] = useState(initialUser.nom);
  const [userPrenom, setUserPrenom] = useState(initialUser.prenom);
  const [userId, setUserId] = useState(initialUser.id);

  const handleAvatarSelect = async (img) => {
    setAvatar(img);
    setShowPopup(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      try {
        const url = `/api/auth/users/${storedUser.id}/avatar`; // route PUT dédiée avatar
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ avatar: img }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur brute du serveur :", errorText);
          alert("Erreur lors de la sauvegarde de l'avatar sur le serveur.");
          return;
        }

        const data = await response.json();

        // Mets à jour le localStorage avec l'avatar reçu en réponse (au cas où le backend modifie l'URL)
        const updatedUser = { ...storedUser, avatar: data.avatar || img };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setAvatar(updatedUser.avatar);

        alert("Avatar mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur JS :", error);
        alert("Erreur lors de la sauvegarde de l'avatar sur le serveur.");
      }
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) {
      window.location.href = "/connexion";
    } else {
      setUserNom(stored.nom);
      setUserPrenom(stored.prenom);
      setUserId(stored.id);
      setAvatar(stored.avatar || "/img/avatar.png");
    }
  }, []);

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
              <span className="user-fullname">
                {userPrenom} {userNom}
              </span>
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
                <li onClick={() => handleOptionClick("donnees")}>
                  <img src="/img/ressources.png" alt="Données personnelles" />{" "}
                  Gérer les données personnelles
                </li>
                <li onClick={() => handleOptionClick("adresse")}>
                  <img src="/img/accueil (1).png" alt="Adresse" /> Adresse de
                  livraison
                </li>
                <li onClick={() => handleOptionClick("motdepasse")}>
                  <img src="/img/mot-de-passe (1).png" alt="Mot de passe" />{" "}
                  Modifier votre mot de passe
                </li>
                <li onClick={() => handleOptionClick("deconnexion")}>
                  <img src="/img/deconnexion (1).png" alt="Déconnexion" />{" "}
                  Déconnexion
                </li>
              </ul>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <img
                  src="/img/magazine.png"
                  alt="Magazine"
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
