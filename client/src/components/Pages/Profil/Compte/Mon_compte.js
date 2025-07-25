import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

import "./Mon_compte.css";

// Popups existantes
import DataFormPopup from './Popup/DataFormPopup';
import AddressFormPopup from './Popup/AdressFormPopup';
import PasswordFormPopup from './Popup/PasswordFormPopup';
import LeaveCommentPopup from './Popup/CommentFormPopup'; // Renommé pour clarté
import DemandeAdoptionPopup from './Popup/DemandeAdoptionPopup';
// Nouveaux imports pour les popups spécifiques aux commentaires
import UserCommentsListPopup from './Popup/UserCommentsListPopup'; // Nouveau
// Composant ReadMorePopup déplace à l'intérieur de Mon_compte.js ou UserCommentsListPopup.js pour gérer le state showReadMorePopup localement
// Pour cet exemple, je le laisse dans le même fichier si vous le gardez géré par Mon_compte,
// ou il peut être dans UserCommentsListPopup si vous voulez une gestion plus locale.
// Pour la demande, je le laisse géré globalement ici.

const avatarOptions = [
  "/img/Avatar/avatar_chat1.jpg",
  "/img/Avatar/avatar_chat2.jpg",
  "/img/Avatar/avatar_chat3.jpg",
  "/img/Avatar/avatar_chat4.jpg",
  "/img/Avatar/avatar_chat5.png",
  "/img/Avatar/avatar_chat6.png",
  "/img/Avatar/avatar_chien1.jpg",
  "/img/Avatar/avatar_chien2.jpg",
  "/img/Avatar/avatar_chien3.jpg",
  "/img/Avatar/avatar_chien4.jpg",
  "/img/Avatar/avatar_chien5.png",
  "/img/Avatar/avatar_chien6.png",
];

const API_URL = process.env.REACT_APP_API_URL;

// Nouveau composant Popup pour lire la suite - déplacé ici si vous voulez le contrôler depuis Mon_compte
// Ou il peut être directement dans UserCommentsListPopup pour un contrôle plus local
const ReadMorePopup = ({ commentText, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-modal read-more-modal">
        <div className="popup-header">
          <h3>Commentaire complet</h3>
          <button onClick={onClose} className="close-popup-btn">&times;</button>
        </div>
        <div className="popup-body">
          <p className="full-comment-text">{commentText}</p>
        </div>
        <div className="popup-buttons">
          <button onClick={onClose} className="close-btn">Fermer</button>
        </div>
      </div>
    </div>
  );
};


const Mon_compte = () => {
  const { user, logout, loading, updateAvatar } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showDataPopup, setShowDataPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showLeaveCommentPopup, setShowLeaveCommentPopup] = useState(false); // Renommé
  const [showAdoptionPopup, setShowAdoptionPopup] = useState(false);
  const [showMagazinePopup, setShowMagazinePopup] = useState(false);
  const [showUserCommentsListPopup, setShowUserCommentsListPopup] = useState(false); // Nouveau state
  const [showReadMorePopup, setShowReadMorePopup] = useState(false);
  const [currentReadMoreComment, setCurrentReadMoreComment] = useState("");


  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchUserComments = async () => {
    if (!user?._id) return;
    setLoadingComments(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/comments/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUserComments(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires :', err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/connexion');
    } else if (user?._id) {
      fetchUserComments();
    }
  }, [user, loading, navigate]);

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression du commentaire');

      setUserComments(prev => prev.filter(c => c._id !== commentId));
      setMessage('Commentaire supprimé avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur de suppression :', err);
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  const handleAvatarSelect = async (imgUrl) => {
    setShowAvatarPopup(false);
    setMessage('Mise à jour de l\'avatar en cours...');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/profile/avatar-url`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ avatarUrl: imgUrl })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Erreur mise à jour avatar');

      setMessage(data.msg);
      updateAvatar(data.avatarUrl || imgUrl);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur avatar :', err);
      setError(err.message);
      setTimeout(() => setError(''), 3000);
      setMessage('');
    }
  };

  const handleFormUpdateSuccess = () => {
    setShowDataPopup(false);
    setShowAddressPopup(false);
    setShowPasswordPopup(false);
    setShowLeaveCommentPopup(false); // Renommé
    setShowAdoptionPopup(false);
    setShowUserCommentsListPopup(false); // Fermer la liste des commentaires si ouverte
    fetchUserComments(); // Rafraîchir les commentaires
    setMessage("Vos informations ont été mises à jour avec succès !");
    setTimeout(() => setMessage(''), 3000);
  };

  const handleOptionClick = (option) => {
    setMessage('');
    setError('');
    switch (option) {
      case "donnees": setShowDataPopup(true); break;
      case "adresse": setShowAddressPopup(true); break;
      case "motdepasse": setShowPasswordPopup(true); break;
      case "deconnexion": handleLogout(); break;
      case "commentaires": setShowLeaveCommentPopup(true); break; // Renommé
      case "adoption": setShowAdoptionPopup(true); break;
      case "magazine": setShowMagazinePopup(true); break;
      case "voirAvis": setShowUserCommentsListPopup(true); break; // Nouveau cas
      default: break;
    }
  };

  const handleReadMoreClick = (commentText) => {
    setCurrentReadMoreComment(commentText);
    setShowReadMorePopup(true);
  };

  const displayAvatarUrl = user.avatar
    ? user.avatar.startsWith('/uploads/')
      ? `${API_URL}${user.avatar}`
      : user.avatar
    : '/img/Avatar/avatar_chat1.jpg';

  if (loading) return <div className="mon-compte-container">Chargement du profil...</div>;
  if (!user) return <div className="mon-compte-container">Vous n'êtes pas connecté.</div>;

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
              <span className="user-fullname">{user.prenom} {user.nom}</span>
            </div>
          </div>
          <div className="intro-texte">
            Bienvenue sur votre espace personnel dédié à la gestion de votre compte.
          </div>
        </div>

        <div className="compte-right">
          <div className="compte-options-grid">
            <div className="compte-option green-border-option" data-title="Mes données">
              <ul className="ul_compte">
                <li onClick={() => handleOptionClick("donnees")}>
                  <img src="/img/ressources.png" alt="Données" /> Gérer les données personnelles
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

            <div className="compte-option green-border-option clickable" onClick={() => handleOptionClick("magazine")} data-title="Découvrir">
              <div className="option-content">
                <img src="/img/magazine.png" alt="Magazine" className="option-img" />
                <span>Notre magazine</span>
              </div>
            </div>

            <div className="compte-option green-border-option" data-title="Commentaires">
              <div className="option-content">
                <button className="comment-button" onClick={() => handleOptionClick("commentaires")}>
                  Laisser un commentaire
                </button>
              </div>
            </div>

            <div className="compte-option green-border-option" data-title="Vos Avis">
              <div className="option-content">
                <button className="view-comments-button" onClick={() => handleOptionClick("voirAvis")}>
                  Voir mes avis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showAvatarPopup && (
        <div className="avatar-popup popup-overlay">
          <div className="popup-modal">
            <div className="popup-header">
              <h3>Choisissez votre avatar</h3>
              <button onClick={() => setShowAvatarPopup(false)} className="close-popup-btn">&times;</button>
            </div>
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
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="popup-buttons">
              <button onClick={() => setShowAvatarPopup(false)} className="close-btn">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showMagazinePopup && (
        <div className="magazine-popup popup-overlay">
          <div className="popup-modal">
            <div className="popup-header">
              <h3>Notre magazine</h3>
              <button onClick={() => setShowMagazinePopup(false)} className="close-popup-btn">&times;</button>
            </div>
            <div className="popup-body">
              <img src="/img/magazine.png" alt="Magazine en grand" className="large-magazine-img" />
            </div>
          </div>
        </div>
      )}

      {showDataPopup && (
        <DataFormPopup onClose={() => setShowDataPopup(false)} user={user} onUpdateSuccess={handleFormUpdateSuccess} />
      )}
      {showAddressPopup && (
        <AddressFormPopup onClose={() => setShowAddressPopup(false)} user={user} onUpdateSuccess={handleFormUpdateSuccess} />
      )}
      {showPasswordPopup && (
        <PasswordFormPopup onClose={() => setShowPasswordPopup(false)} />
      )}
      {showLeaveCommentPopup && ( // Renommé
        <LeaveCommentPopup onClose={() => setShowLeaveCommentPopup(false)} onCommentSubmitSuccess={handleFormUpdateSuccess} user={user} />
      )}
      {showAdoptionPopup && (
        <DemandeAdoptionPopup onClose={() => setShowAdoptionPopup(false)} user={user} />
      )}

      {showUserCommentsListPopup && ( // Nouvelle popup pour lister les commentaires
        <UserCommentsListPopup
          comments={userComments}
          onClose={() => setShowUserCommentsListPopup(false)}
          onDeleteComment={handleDeleteComment}
          onReadMoreClick={handleReadMoreClick}
        />
      )}

      {showReadMorePopup && (
        <ReadMorePopup
          commentText={currentReadMoreComment}
          onClose={() => setShowReadMorePopup(false)}
        />
      )}
    </div>
  );
};

export default Mon_compte;