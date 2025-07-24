import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

import "./Mon_compte.css";

// Popups
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

const API_URL = process.env.REACT_APP_API_URL;

const Mon_compte = () => {
  const { user, logout, loading, updateAvatar } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showDataPopup, setShowDataPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showAdoptionPopup, setShowAdoptionPopup] = useState(false);

  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/connexion');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/commentaires/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setUserComments(data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des commentaires:', err);
      }
    };

    if (user && user._id) {
      fetchUserComments();
    }
  }, [user]);

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/commentaires/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression.');

      setUserComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  if (loading) return <div className="mon-compte-container">Chargement du profil...</div>;
  if (!user) return <div className="mon-compte-container">Vous n'êtes pas connecté.</div>;

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

      if (!response.ok) {
        throw new Error(data.msg || 'Erreur lors de la mise à jour de l’avatar.');
      }

      setMessage(data.msg);
      updateAvatar(data.avatarUrl || imgUrl);

    } catch (error) {
      console.error("Erreur avatar:", error);
      setError(error.message || "Erreur lors de la mise à jour de l'avatar.");
      setMessage('');
    }
  };

  const handleFormUpdateSuccess = () => {
    setShowDataPopup(false);
    setShowAddressPopup(false);
    setShowPasswordPopup(false);
    setShowCommentPopup(false);
    setShowAdoptionPopup(false);
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
      case "commentaires": setShowCommentPopup(true); break;
      case "adoption": setShowAdoptionPopup(true); break;
      default: break;
    }
  };

  const displayAvatarUrl = user.avatar
    ? user.avatar.startsWith('/uploads/')
      ? `${API_URL}${user.avatar}`
      : user.avatar
    : '/img/Avatar/avatar_chat1.jpg';

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
            <div className="compte-option">
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

            <div className="compte-option">
              <div className="option-content">
                <img src="/img/magazine.png" alt="Magazine" className="option-img" />
                <span>Notre magazine</span>
              </div>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <button className="comment-button" onClick={() => handleOptionClick("commentaires")}>
                  Laisser un commentaire
                </button>
              </div>
            </div>

            <div className="compte-option">
              <div className="option-content">
                <h4 style={{ marginBottom: "1rem", color: "#444", fontSize: "1.2rem" }}>Vos avis</h4>
                {userComments.length === 0 ? (
                  <p style={{ color: "#999", fontStyle: "italic" }}>Aucun avis laissé pour le moment.</p>
                ) : (
                  <ul className="user-comments-list">
                    {userComments.map((comment) => (
                      <li key={comment._id} className="comment-item">
                        <p>{comment.contenu}</p>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="delete-comment-btn"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
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

      {showDataPopup && (
        <DataFormPopup onClose={() => setShowDataPopup(false)} user={user} onUpdateSuccess={handleFormUpdateSuccess} />
      )}
      {showAddressPopup && (
        <AddressFormPopup onClose={() => setShowAddressPopup(false)} user={user} onUpdateSuccess={handleFormUpdateSuccess} />
      )}
      {showPasswordPopup && (
        <PasswordFormPopup onClose={() => setShowPasswordPopup(false)} />
      )}
      {showCommentPopup && (
        <CommentFormPopup onClose={() => setShowCommentPopup(false)} onCommentSubmitSuccess={handleFormUpdateSuccess} user={user} />
      )}
      {showAdoptionPopup && (
        <DemandeAdoptionPopup onClose={() => setShowAdoptionPopup(false)} user={user} />
      )}
    </div>
  );
};

export default Mon_compte;
