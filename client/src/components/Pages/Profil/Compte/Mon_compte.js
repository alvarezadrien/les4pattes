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
import UserCommentsListPopup from './Popup/UserCommentsListPopup';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SuccessPopup = ({ message, onClose }) => (
  <div className="success-popup">
    <div className="success-popup-content">
      <span>{message}</span>
    </div>
  </div>
);

// ✅ Popup intégré ici directement
const ReadMorePopup = ({ commentText, onClose }) => (
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

const Mon_compte = () => {
  const { user, logout, loading, updateAvatar } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);

  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showDataPopup, setShowDataPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showAdoptionPopup, setShowAdoptionPopup] = useState(false);
  const [showMagazinePopup, setShowMagazinePopup] = useState(false);
  const [showUserCommentsListPopup, setShowUserCommentsListPopup] = useState(false);
  const [showReadMorePopup, setShowReadMorePopup] = useState(false);
  const [currentReadMoreComment, setCurrentReadMoreComment] = useState("");

  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchUserComments = async () => {
    if (!user?._id) return;
    setLoadingComments(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/comments/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Erreur');
      setUserComments(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erreur lors du chargement des commentaires.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) navigate('/connexion');
    if (user?._id) fetchUserComments();
  }, [user, loading, navigate]);

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Erreur suppression');
      setUserComments(prev => prev.filter(c => c._id !== commentId));
      setShowPopupSuccess(true);
      setTimeout(() => setShowPopupSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleEditComment = async (commentId, newText, newRating) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ commentText: newText, rating: newRating })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Erreur modification');

      setUserComments(prev => prev.map(comment =>
        comment._id === commentId ? { ...comment, commentText: newText, rating: newRating } : comment
      ));
      setShowPopupSuccess(true);
      setTimeout(() => setShowPopupSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
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
            <div className="compte-option" data-title="Mes données">
              <ul className="ul_compte">
                <li onClick={() => setShowDataPopup(true)}>
                  <img src="/img/ressources.png" alt="Données" /> Gérer les données personnelles
                </li>
                <li onClick={() => setShowAddressPopup(true)}>
                  <img src="/img/accueil (1).png" alt="Adresse" /> Adresse de livraison
                </li>
                <li onClick={() => setShowPasswordPopup(true)}>
                  <img src="/img/mot-de-passe (1).png" alt="Mot de passe" /> Modifier votre mot de passe
                </li>
                <li onClick={() => { logout(); navigate('/connexion'); }}>
                  <img src="/img/deconnexion (1).png" alt="Déconnexion" /> Déconnexion
                </li>
              </ul>
            </div>

            <div className="compte-option" onClick={() => setShowMagazinePopup(true)} data-title="Découvrir">
              <div className="option-content">
                <img src="/img/magazine.png" alt="Magazine" className="option-img" />
                <span>Notre magazine</span>
              </div>
            </div>

            <div className="compte-option" data-title="Commentaires">
              <div className="option-content">
                <button className="comment-button" onClick={() => setShowCommentPopup(true)}>
                  Laisser un commentaire
                </button>
              </div>
            </div>

            <div className="compte-option" data-title="Vos Avis">
              <div className="option-content">
                <button className="view-comments-button" onClick={() => setShowUserCommentsListPopup(true)}>
                  Voir mes avis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopupSuccess && <SuccessPopup message="Action réalisée avec succès !" />}
      {error && <p className="error-message">{error}</p>}

      {showDataPopup && <DataFormPopup onClose={() => setShowDataPopup(false)} user={user} onUpdateSuccess={fetchUserComments} />}
      {showAddressPopup && <AddressFormPopup onClose={() => setShowAddressPopup(false)} user={user} onUpdateSuccess={fetchUserComments} />}
      {showPasswordPopup && <PasswordFormPopup onClose={() => setShowPasswordPopup(false)} />}
      {showCommentPopup && <CommentFormPopup onClose={() => setShowCommentPopup(false)} onCommentSubmitSuccess={fetchUserComments} user={user} />}
      {showAdoptionPopup && <DemandeAdoptionPopup onClose={() => setShowAdoptionPopup(false)} user={user} />}
      {showUserCommentsListPopup && (
        <UserCommentsListPopup
          comments={userComments}
          onClose={() => setShowUserCommentsListPopup(false)}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
          onReadMoreClick={(text) => { setCurrentReadMoreComment(text); setShowReadMorePopup(true); }}
          loading={loadingComments}
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
