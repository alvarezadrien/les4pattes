import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/api';

import "./Mon_compte.css";
// Importation des nouveaux composants de popup
import DataFormPopup from './Popup/DataFormPopup';
import AddressFormPopup from './Popup/AdressFormPopup';
import PasswordFormPopup from './Popup/PasswordFormPopup';
import CommentFormPopup from './Popup/CommentFormPopup';
import DemandeAdoptionPopup from './Popup/DemandeAdoptionPopup';


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

const Mon_compte = () => {
  const { user, logout, loading, updateAvatar } = useAuth();
  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAvatarPopup, setShowAvatarPopup] = useState(false); // Renommé pour plus de clarté
  const [showDataPopup, setShowDataPopup] = useState(false); // État pour le popup données
  const [showAddressPopup, setShowAddressPopup] = useState(false); // État pour le popup adresse
  const [showPasswordPopup, setShowPasswordPopup] = useState(false); // État pour le popup mot de passe
  const [showCommentPopup, setShowCommentPopup] = useState(false); // État pour le popup commentaire
  const [showAdoptionPopup, setShowAdoptionPopup] = useState(false); // État pour le popup adoption


  useEffect(() => {
    if (!loading && !user) {
      navigate('/connexion');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="mon-compte-container">Chargement du profil...</div>;
  }

  if (!user) {
    return <div className="mon-compte-container">Vous n'êtes pas connecté.</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  // --- LOGIQUE POUR LE TÉLÉVERSEMENT D'AVATAR (FICHIER) ---
  const handleAvatarUpload = async (file) => {
    if (!file) {
      setError('Veuillez sélectionner un fichier à téléverser.');
      return;
    }

    setMessage('Téléchargement de l\'avatar en cours...');
    setError('');
    setShowAvatarPopup(false); // Ferme la popup après la sélection

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await api.post('/auth/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.msg);
      updateAvatar(response.data.avatarUrl);
      setAvatarFile(null);
      const fileInput = document.getElementById('avatar-upload-input');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      console.error("Erreur lors du téléversement de l'avatar:", err);
      setError(err.response?.data?.msg || "Erreur lors du téléversement de l'avatar.");
      setMessage('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      handleAvatarUpload(file);
    }
  };

  // --- LOGIQUE POUR LA SÉLECTION D'AVATAR PRÉDÉFINI ---
  const handleAvatarSelect = async (imgUrl) => {
    setShowAvatarPopup(false);
    setMessage('Mise à jour de l\'avatar en cours...');
    setError('');

    try {
      const response = await api.put('/auth/profile/avatar-url', { avatarUrl: imgUrl });

      setMessage(response.data.msg);
      updateAvatar(response.data.avatarUrl);

    } catch (error) {
      console.error("Erreur lors de la sélection de l'avatar prédéfini:", error);
      setError(error.response?.data?.msg || "Erreur lors de la mise à jour de l'avatar.");
      setMessage('');
    }
  };

  // Fonction de rappel pour les popups de formulaire après une mise à jour réussie
  const handleFormUpdateSuccess = () => {
    // Tu peux choisir de fermer tous les popups ou de laisser l'utilisateur le faire
    setShowDataPopup(false);
    setShowAddressPopup(false);
    setShowPasswordPopup(false);
    setShowCommentPopup(false); // Ferme le popup de commentaire aussi
    setShowAdoptionPopup(false); // Ferme le popup d'adoption aussi
    // Ici tu peux aussi mettre un message de succès global si tu veux
    setMessage("Vos informations ont été mises à jour avec succès !");
    setTimeout(() => setMessage(''), 3000); // Efface le message après 3 secondes
  };


  const handleOptionClick = (option) => {
    // Réinitialise les messages avant d'ouvrir un nouveau popup
    setMessage('');
    setError('');

    switch (option) {
      case "donnees":
        setShowDataPopup(true);
        break;
      case "adresse":
        setShowAddressPopup(true);
        break;
      case "motdepasse":
        setShowPasswordPopup(true);
        break;
      case "deconnexion":
        handleLogout();
        break;
      case "commentaires": // Nouvelle option pour les commentaires
        setShowCommentPopup(true);
        break;
      case "adoption": // Ajout de l'option pour le popup d'adoption
        setShowAdoptionPopup(true);
        break;
      default:
        break;
    }
  };

  const displayAvatarUrl = user.avatarUrl
    ? user.avatarUrl.startsWith('/uploads/')
      ? `http://localhost:5000${user.avatarUrl}`
      : user.avatarUrl
    : '/uploads/default_avatar.png';

  return (
    <div className="mon-compte-container">
      <div className="compte-background">
        <div className="compte-left">
          <div className="user-info">
            <img
              src={displayAvatarUrl}
              alt="Avatar"
              className="user-avatar clickable"
              onClick={() => setShowAvatarPopup(true)}
            />
            <div className="user-names">
              <span className="user-fullname">
                {user.prenom} {user.nom}
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
                <button
                  className="comment-button"
                  onClick={() => handleOptionClick("commentaires")}
                >
                  Laisser un commentaire
                </button>
              </div>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <button
                  className="adoption-button"
                  onClick={() => handleOptionClick("adoption")}
                >
                  Mes demandes d'adoption
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup pour la sélection d'avatar (prédéfini ou téléversement) */}
      {showAvatarPopup && (
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

            <div className="upload-section">
              <h4>Ou téléchargez une image personnalisée :</h4>
              <label htmlFor="avatar-upload-input" className="custom-file-upload-button">
                Choisir un fichier
              </label>
              <input
                type="file"
                id="avatar-upload-input"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {avatarFile && <span className="selected-file-name">{avatarFile.name}</span>}
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="popup-buttons">
              <button onClick={() => setShowAvatarPopup(false)} className="close-btn">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popups de formulaire conditionnels */}
      {showDataPopup && (
        <DataFormPopup
          onClose={() => setShowDataPopup(false)}
          user={user}
          onUpdateSuccess={handleFormUpdateSuccess}
        />
      )}
      {showAddressPopup && (
        <AddressFormPopup
          onClose={() => setShowAddressPopup(false)}
          user={user}
          onUpdateSuccess={handleFormUpdateSuccess}
        />
      )}
      {showPasswordPopup && (
        <PasswordFormPopup
          onClose={() => setShowPasswordPopup(false)}
        />
      )}
      {/* Nouveau popup pour les commentaires */}
      {showCommentPopup && (
        <CommentFormPopup
          onClose={() => setShowCommentPopup(false)}
          onCommentSubmitSuccess={handleFormUpdateSuccess}
          // Passer l'utilisateur au CommentFormPopup si des infos user spécifiques sont nécessaires
          user={user} // <<< Ajout de la prop user ici
        />
      )}
      {/* Popup pour les demandes d'adoption */}
      {showAdoptionPopup && (
        <DemandeAdoptionPopup
          onClose={() => setShowAdoptionPopup(false)}
          user={user} // Passez l'utilisateur si nécessaire pour le popup d'adoption
        />
      )}
    </div>
  );
};

export default Mon_compte;