import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api"; // L'import pour la section produits
import './Back_office.css';

// Import de material ui (MUI)
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, IconButton, CircularProgress, Box, Chip,
  TextField, FormControl, InputLabel, Select, MenuItem,
  RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup,
  Grid, Typography, Paper
} from '@mui/material';

// --- Importation des Icônes Material-UI ---
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StoreIcon from '@mui/icons-material/Store'; // Icône pour les produits

// --- URL de base de votre API Backend ---
const API_BASE_URL = 'https://les4pattes-backend.onrender.com/api';

// Composant du modal de confirmation réutilisable
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmer", cancelText = "Annuler" }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      sx={{ '& .MuiPaper-root': { borderRadius: '12px', padding: '20px' } }}
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ textAlign: 'center', pb: 1 }}>
        <WarningAmberIcon sx={{ fontSize: 48, color: '#ff9800', mb: 1 }} />
        <Box component="span" sx={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#3f51b5' }}>
          {title}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText id="confirmation-dialog-description" sx={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pt: 3 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#f44336',
            '&:hover': { backgroundColor: '#d32f2f' },
            px: 3, py: 1.2, fontSize: '1rem', borderRadius: '8px'
          }}
          startIcon={<DeleteIcon />}
        >
          {confirmText}
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor: '#90a4ae',
            color: '#90a4ae',
            '&:hover': { backgroundColor: '#e0e0e0', borderColor: '#78909c' },
            px: 3, py: 1.2, fontSize: '1rem', borderRadius: '8px'
          }}
          startIcon={<CloseIcon />}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// --- Composant Modal Simple Réutilisable (Utilise MUI Dialog) ---
const SimpleModal = ({ children, onClose, title }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      maxWidth="md"
      fullWidth={true}
      sx={{ '& .MuiPaper-root': { borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', maxHeight: '90vh' } }}
    >
      <DialogTitle id="simple-modal-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Box component="span" sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#344767' }}>
          {title}
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#6c757d' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, flexGrow: 1, overflowY: 'auto' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

// --- Composant principal du BackOffice ---
const BackOffice = () => {
  // État pour gérer la visibilité de la section active
  const [activeView, setActiveView] = useState('animals'); // 'animals', 'users', 'comments', 'produits'

  // États de gestion des animaux
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    nom: '',
    espece: '',
    race: '',
    age: '',
    sexe: '',
    taille: '',
    description: '',
    descriptionAdoption: '',
    dateArrivee: '',
    isRescue: false,
    comportement: [],
    ententeAvec: [],
    images: []
  });
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isAnimalFormModalOpen, setIsAnimalFormModalOpen] = useState(false);
  const [animalDetailModal, setAnimalDetailModal] = useState(null);

  // États de gestion des utilisateurs
  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // États de gestion des commentaires
  const [comments, setComments] = useState([]);
  const [commentDetailModal, setCommentDetailModal] = useState(null);

  // NOUVEAU: États de gestion des produits
  const [produits, setProduits] = useState([]);
  const [newProduit, setNewProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    espece: "",
    stock: 0,
    poids: "",
  });

  // États globaux de l'interface utilisateur
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    data: null
  });

  // Fonction générique pour afficher les messages de feedback
  const showFeedback = useCallback((type, message) => {
    setFeedbackMessage({ type, message });
    setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
  }, []);

  // Fonction pour obtenir les headers (revue : inclut le token de localStorage)
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }, []);

  // Fonction générique pour récupérer les données de l'API
  const fetchData = useCallback(async (endpoint, setter, errorMessage) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur pour ${endpoint}:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || errorMessage);
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON): ${errorText.substring(0, 100)}...`);
        }
      }
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Erreur lors du chargement des ${endpoint}:`, error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [showFeedback, getAuthHeaders]);

  // NOUVEAU: Fonction pour récupérer les produits
  const fetchProduits = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/produits"); // Utilise l'instance axios 'api'
      setProduits(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      showFeedback('error', 'Erreur lors de la récupération des produits.');
    } finally {
      setLoading(false);
    }
  }, [showFeedback]);


  // Effet pour récupérer les données initiales au montage du composant
  useEffect(() => {
    fetchData('animaux', setAnimals, 'Échec du chargement des animaux.');
    fetchData('auth/users', setUsers, 'Échec du chargement des utilisateurs.');
    fetchData('comments', setComments, 'Échec du chargement des commentaires.');
    fetchProduits();
  }, [fetchData, fetchProduits]);

  // --- Gestionnaire de la modale de confirmation ---
  const openConfirmationModal = (title, message, onConfirmCallback, data) => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirmCallback(data);
        closeConfirmationModal();
      },
      data
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      data: null
    });
  };

  // --- Fonctions de gestion des animaux ---
  const handleAnimalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnimal(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setNewAnimal(prev => {
      const currentList = prev[field] || [];
      if (checked) {
        return { ...prev, [field]: [...currentList, value] };
      } else {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filesToAdd = files.slice(0, 3 - newAnimal.images.length);
    const previews = filesToAdd.map(file => URL.createObjectURL(file));

    if (newAnimal.images.length + filesToAdd.length > 3) {
      showFeedback('error', 'Vous pouvez télécharger un maximum de 3 images.');
    }

    setNewAnimal(prev => ({
      ...prev,
      images: [...prev.images, ...filesToAdd]
    }));

    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImagePreview = (indexToRemove) => {
    const urlToRevoke = imagePreviews[indexToRemove];
    if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRevoke);
    }

    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

    setNewAnimal(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmitAnimal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });

    const isEditing = !!editingAnimal;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/animaux/${editingAnimal._id}`
      : `${API_BASE_URL}/animaux`;

    try {
      const formData = new FormData();
      formData.append('nom', newAnimal.nom || '');
      formData.append('espece', newAnimal.espece || '');
      formData.append('race', newAnimal.race || '');
      formData.append('age', newAnimal.age || '');
      formData.append('sexe', newAnimal.sexe || '');
      formData.append('taille', newAnimal.taille || '');
      formData.append('description', newAnimal.description || '');
      formData.append('descriptionAdoption', newAnimal.descriptionAdoption || '');
      formData.append('dateArrivee', newAnimal.dateArrivee || '');
      formData.append('isRescue', newAnimal.isRescue ? 'true' : 'false');
      formData.append('comportement', JSON.stringify(newAnimal.comportement || []));
      formData.append('ententeAvec', JSON.stringify(newAnimal.ententeAvec || []));
      formData.append('dossier', newAnimal.espece?.toLowerCase() === 'chat' ? 'Chats' : 'Chiens');

      if (!isEditing || newAnimal.images.length > 0) {
        if (newAnimal.images[0]) formData.append('image1', newAnimal.images[0]);
        if (newAnimal.images[1]) formData.append('image2', newAnimal.images[1]);
        if (newAnimal.images[2]) formData.append('image3', newAnimal.images[2]);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur lors de l'envoi de données pour animaux:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || `Erreur lors de ${isEditing ? 'la modification' : 'l\'ajout'} de l'animal.`);
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON) lors de l'envoi de données: ${errorText.substring(0, 100)}...`);
        }
      }

      const resultAnimal = await response.json();

      if (!isEditing) {
        setAnimals(prev => [...prev, resultAnimal.animal]);
        showFeedback('success', 'Animal ajouté avec succès !');
      } else {
        setAnimals(prev => prev.map(animal => animal._id === resultAnimal._id ? resultAnimal : animal));
        showFeedback('success', 'Animal mis à jour avec succès !');
      }

      closeAnimalFormModal();

    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnimalClick = () => {
    setNewAnimal({
      nom: '', espece: '', race: '', age: '', sexe: '', taille: '',
      description: '', descriptionAdoption: '', dateArrivee: '',
      isRescue: false, comportement: [], ententeAvec: [], images: []
    });
    setImagePreviews([]);
    setEditingAnimal(null);
    setIsAnimalFormModalOpen(true);
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
    setNewAnimal({
      nom: animal.nom || '',
      espece: animal.espece || '',
      race: animal.race || '',
      age: animal.age || '',
      sexe: animal.sexe || '',
      taille: animal.taille || '',
      description: animal.description || '',
      descriptionAdoption: animal.descriptionAdoption || '',
      dateArrivee: animal.dateArrivee ? new Date(animal.dateArrivee).toISOString().split('T')[0] : '',
      isRescue: animal.isRescue || false,
      comportement: [...(animal.comportement || [])],
      ententeAvec: [...(animal.ententeAvec || [])],
      images: [...(animal.images || [])]
    });
    setImagePreviews([...(animal.images || [])]);
    setIsAnimalFormModalOpen(true);
  };

  const closeAnimalFormModal = () => {
    imagePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setIsAnimalFormModalOpen(false);
    setEditingAnimal(null);
    setNewAnimal({
      nom: '', espece: '', race: '', age: '', sexe: '', taille: '',
      description: '', descriptionAdoption: '', dateArrivee: '',
      isRescue: false, comportement: [], ententeAvec: [], images: []
    });
    setImagePreviews([]);
  };

  const confirmDeleteAnimal = (animalId) => {
    openConfirmationModal(
      'Supprimer cet animal ?',
      'Êtes-vous certain de vouloir supprimer cet animal définitivement ? Cette action est irréversible.',
      executeDeleteAnimal,
      animalId
    );
  };

  const executeDeleteAnimal = async (id) => {
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/animaux/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur lors de la suppression d'animal:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || 'Échec de la suppression de l\'animal.');
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON) lors de la suppression: ${errorText.substring(0, 100)}...`);
        }
      }

      setAnimals(prev => prev.filter(animal => animal._id !== id));
      showFeedback('success', 'Animal supprimé avec succès !');
    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAnimalStatus = async (id, currentAdopteStatus) => {
    const newAdopteStatus = !currentAdopteStatus;
    const statusText = newAdopteStatus ? 'Adopté' : 'Disponible';

    openConfirmationModal(
      `Changer le statut de l'animal ?`,
      `Voulez-vous vraiment changer le statut de cet animal en "${statusText}" ?`,
      executeChangeAnimalStatus,
      { id, newAdopteStatus }
    );
  };

  const executeChangeAnimalStatus = async ({ id, newAdopteStatus }) => {
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/animaux/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ adopte: newAdopteStatus })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur lors du changement de statut:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || 'Échec de la mise à jour du statut.');
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON) lors du changement de statut: ${errorText.substring(0, 100)}...`);
        }
      }

      const updatedAnimal = await response.json();
      setAnimals(prev => prev.map(animal => animal._id === id ? updatedAnimal : animal));
      showFeedback('success', `Statut de l'animal mis à jour en "${newAdopteStatus ? 'Adopté' : 'Disponible'}" !`);
    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnimalDetails = (animal) => {
    setAnimalDetailModal(animal);
  };

  // --- Fonctions de gestion des utilisateurs ---
  const confirmDeleteUser = (userId) => {
    openConfirmationModal(
      'Supprimer cet utilisateur ?',
      'Êtes-vous certain de vouloir supprimer cet utilisateur définitivement ? Toutes les données associées seront perdues.',
      executeDeleteUser,
      userId
    );
  };

  const executeDeleteUser = async (id) => {
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur lors de la suppression d'utilisateur:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || 'Échec de la suppression de l\'utilisateur.');
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON) lors de la suppression d'utilisateur: ${errorText.substring(0, 100)}...`);
        }
      }

      setUsers(prev => prev.filter(user => user._id !== id));
      showFeedback('success', 'Utilisateur supprimé avec succès !');
    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Fonctions de gestion des commentaires ---
  const confirmDeleteComment = (commentId) => {
    openConfirmationModal(
      'Supprimer ce commentaire ?',
      'Êtes-vous certain de vouloir supprimer ce commentaire définitivement ?',
      executeDeleteComment,
      commentId
    );
  };

  const executeDeleteComment = async (id) => {
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur de réponse du serveur lors de la suppression de commentaire:`, errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (response.status === 401 || response.status === 403) {
            showFeedback('error', 'Accès non autorisé par le serveur. Assurez-vous d\'être connecté avec les droits requis.');
          }
          throw new Error(errorData.message || 'Échec de la suppression du commentaire.');
        } catch (jsonError) {
          throw new Error(`Réponse inattendue du serveur (non-JSON) lors de la suppression de commentaire: ${errorText.substring(0, 100)}...`);
        }
      }

      setComments(prev => prev.filter(comment => comment._id !== id));
      showFeedback('success', 'Commentaire supprimé avec succès !');
    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCommentDetails = (comment) => {
    setCommentDetailModal(comment);
  };

  // NOUVEAU: Fonctions de gestion des produits
  const handleProduitInputChange = (e, field, produitId = null) => {
    const value = e.target.value;
    if (produitId) {
      setProduits((prev) =>
        prev.map((p) =>
          p._id === produitId ? { ...p, [field]: value } : p
        )
      );
    } else {
      setNewProduit({ ...newProduit, [field]: value });
    }
  };

  const handleAddProduit = async () => {
    setLoading(true);
    try {
      await api.post("/api/produits", newProduit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showFeedback('success', 'Produit ajouté avec succès.');
      setNewProduit({
        nom: "",
        description: "",
        prix: "",
        image: "",
        espece: "",
        stock: 0,
        poids: "",
      });
      fetchProduits();
    } catch (err) {
      console.error("Erreur ajout :", err);
      showFeedback('error', 'Erreur lors de l\'ajout du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduit = async (produit) => {
    setLoading(true);
    try {
      await api.put(`/api/produits/${produit._id}`, produit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showFeedback('success', 'Produit mis à jour avec succès.');
      fetchProduits();
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      showFeedback('error', 'Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteProduit = (produitId) => {
    openConfirmationModal(
      'Supprimer ce produit ?',
      'Êtes-vous certain de vouloir supprimer ce produit définitivement ?',
      executeDeleteProduit,
      produitId
    );
  };

  const executeDeleteProduit = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/api/produits/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showFeedback('success', 'Produit supprimé.');
      fetchProduits();
    } catch (err) {
      console.error("Erreur suppression :", err);
      showFeedback('error', 'Erreur lors de la suppression.');
    } finally {
      setLoading(false);
    }
  };


  // Animaux filtrés pour l'affichage (recherche côté client)
  const filteredAnimals = animals.filter(animal =>
    (animal.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (animal.espece || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (animal.race || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Utilisateurs filtrés pour l'affichage (recherche côté client)
  const filteredUsers = users.filter(user =>
    (user.nom || '').toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (user.prenom || '').toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Options communes pour les cases à cocher (comportement et ententeAvec)
  const commonBehaviors = ['calme', 'actif', 'affectueux', 'independant', 'sociable', 'joueur', 'curieux', 'calin'];
  const commonCompatibilities = ['enfants', 'chiens', 'chats', 'familles'];

  return (
    <div className="back-office-container">
      <h1 className="back-office-title">
        <PetsIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 2 }} /> Back Office - Les 4 Pattes
      </h1>

      {/* Section des messages de feedback */}
      {feedbackMessage.message && (
        <div className={`feedback-message ${feedbackMessage.type}`}>
          {feedbackMessage.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
          <span>{feedbackMessage.message}</span>
        </div>
      )}

      {/* Overlay de chargement */}
      {loading && (
        <div className="loading-overlay">
          <CircularProgress color="inherit" size={60} />
        </div>
      )}

      <div className="header-actions">
        <nav className="main-nav-buttons">
          <button
            className={`nav-btn ${activeView === 'animals' ? 'active' : ''}`}
            onClick={() => setActiveView('animals')}
          >
            <PetsIcon /> Animaux ({animals.length})
          </button>
          <button
            className={`nav-btn ${activeView === 'users' ? 'active' : ''}`}
            onClick={() => setActiveView('users')}
          >
            <GroupIcon /> Utilisateurs ({users.length})
          </button>
          <button
            className={`nav-btn ${activeView === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveView('comments')}
          >
            <ChatBubbleIcon /> Commentaires ({comments.length})
          </button>
          <button
            className={`nav-btn ${activeView === 'produits' ? 'active' : ''}`}
            onClick={() => setActiveView('produits')}
          >
            <StoreIcon /> Produits ({produits.length})
          </button>
        </nav>
      </div>


      <div className="dashboard-grid">
        {activeView === 'animals' && (
          <div className="grid-card grid-card-animals">
            <div className="card-header">
              <h3>Gestion des Animaux</h3>
              <Button
                variant="contained"
                className="btn-add"
                onClick={handleAddAnimalClick}
                startIcon={<AddIcon />}
              >
                Ajouter un animal
              </Button>
            </div>
            <div className="card-content">
              <div className="search-bar">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Rechercher un animal par nom, espèce, race..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="table-responsive">
                <table className="data-table animals-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Espèce</th>
                      <th>Race</th>
                      <th>Âge</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnimals.length > 0 ? (
                      filteredAnimals.map(animal => (
                        <tr key={animal._id}>
                          <td>{animal._id.substring(0, 6)}...</td>
                          <td>{animal.nom}</td>
                          <td>{animal.espece}</td>
                          <td>{animal.race}</td>
                          <td>{animal.age} ans</td>
                          <td>
                            <Chip
                              label={animal.adopte ? 'Adopté' : 'Disponible'}
                              icon={animal.adopte ? <CheckIcon /> : <PetsIcon />}
                              color={animal.adopte ? 'success' : 'primary'}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </td>
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-view" onClick={() => handleViewAnimalDetails(animal)} title="Voir détails">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton className="btn-icon btn-edit" onClick={() => handleEditAnimal(animal)} title="Modifier">
                              <EditIcon />
                            </IconButton>
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteAnimal(animal._id)} title="Supprimer">
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              className={`btn-icon ${animal.adopte ? 'btn-unadopt' : 'btn-adopt'}`}
                              onClick={() => handleChangeAnimalStatus(animal._id, animal.adopte)}
                              title={animal.adopte ? 'Marquer Disponible' : 'Marquer Adopté'}
                            >
                              {animal.adopte ? <PetsIcon /> : <CheckIcon />}
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data">Aucun animal trouvé.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'users' && (
          <div className="grid-card grid-card-users">
            <div className="card-header">
              <h3>Gestion des Utilisateurs</h3>
            </div>
            <div className="card-content">
              <div className="search-bar">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur par nom, email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                />
              </div>
              <div className="table-responsive">
                <table className="data-table users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom Complet</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Date d'inscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <tr key={user._id}>
                          <td>{user._id.substring(0, 6)}...</td>
                          <td>{(user.nom || '') + ' ' + (user.prenom || '')}</td>
                          <td>{user.email}</td>
                          <td>
                            <Chip
                              label={user.role}
                              icon={<PersonIcon />}
                              color={user.role === 'admin' ? 'secondary' : 'default'}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteUser(user._id)} title="Supprimer utilisateur">
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data">Aucun utilisateur enregistré.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'comments' && (
          <div className="grid-card grid-card-comments">
            <div className="card-header">
              <h3>Gestion des Commentaires</h3>
            </div>
            <div className="card-content">
              <div className="table-responsive">
                <table className="data-table comments-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Auteur</th>
                      <th>Contenu</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.length > 0 ? (
                      comments.map(comment => (
                        <tr key={comment._id}>
                          <td>{comment._id.substring(0, 6)}...</td>
                          <td>{comment.username}</td>
                          <td className="comment-content-cell" title={comment.commentText}>{comment.commentText}</td>
                          <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-view" onClick={() => handleViewCommentDetails(comment)} title="Voir le commentaire complet">
                              <VisibilityIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">Aucun commentaire reçu.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NOUVEAU: Section Produits */}
        {activeView === 'produits' && (
          <div className="grid-card grid-card-produits">
            <div className="card-header">
              <h3>Gestion des Produits</h3>
            </div>
            <div className="card-content">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, borderRadius: '12px', mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
                      Ajouter un produit
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Nom"
                          value={newProduit.nom}
                          onChange={(e) => handleProduitInputChange(e, "nom")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Prix"
                          type="number"
                          value={newProduit.prix}
                          onChange={(e) => handleProduitInputChange(e, "prix")}
                          required
                          inputProps={{ step: "0.01" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Image (chemin)"
                          value={newProduit.image}
                          onChange={(e) => handleProduitInputChange(e, "image")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Espèce (chat/chien)"
                          value={newProduit.espece}
                          onChange={(e) => handleProduitInputChange(e, "espece")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Stock"
                          type="number"
                          value={newProduit.stock}
                          onChange={(e) => handleProduitInputChange(e, "stock")}
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Poids"
                          value={newProduit.poids}
                          onChange={(e) => handleProduitInputChange(e, "poids")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          multiline
                          rows={3}
                          value={newProduit.description}
                          onChange={(e) => handleProduitInputChange(e, "description")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddProduit}
                          startIcon={<AddIcon />}
                          disabled={loading}
                        >
                          Ajouter le produit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, borderRadius: '12px' }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
                      Liste des produits
                    </Typography>
                    <div className="table-responsive">
                      <table className="data-table produits-table">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Stock</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {produits.length > 0 ? (
                            produits.map(produit => (
                              <tr key={produit._id}>
                                <td>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={produit.nom}
                                    onChange={(e) => handleProduitInputChange(e, "nom", produit._id)}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={produit.prix}
                                    onChange={(e) => handleProduitInputChange(e, "prix", produit._id)}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={produit.stock}
                                    onChange={(e) => handleProduitInputChange(e, "stock", produit._id)}
                                  />
                                </td>
                                <td className="actions-cell">
                                  <IconButton
                                    className="btn-icon btn-edit"
                                    onClick={() => handleUpdateProduit(produit)}
                                    title="Modifier le produit"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    className="btn-icon btn-delete"
                                    onClick={() => confirmDeleteProduit(produit._id)}
                                    title="Supprimer le produit"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="no-data">Aucun produit trouvé.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>

      {/* Modale du formulaire d'animal */}
      {isAnimalFormModalOpen && (
        <SimpleModal onClose={closeAnimalFormModal} title={editingAnimal ? `Modifier l'animal : ${editingAnimal.nom}` : 'Ajouter un nouvel animal'}>
          <form onSubmit={handleSubmitAnimal} className="modal-form animal-form">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="nom"
                  value={newAnimal.nom}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Espèce"
                  name="espece"
                  value={newAnimal.espece}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Race"
                  name="race"
                  value={newAnimal.race}
                  onChange={handleAnimalChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Âge (ans)"
                  name="age"
                  type="number"
                  value={newAnimal.age}
                  onChange={handleAnimalChange}
                  inputProps={{ min: 0 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sexe</InputLabel>
                  <Select
                    name="sexe"
                    value={newAnimal.sexe}
                    onChange={handleAnimalChange}
                    label="Sexe"
                    required
                  >
                    <MenuItem value="">Sélectionner</MenuItem>
                    <MenuItem value="Mâle">Mâle</MenuItem>
                    <MenuItem value="Femelle">Femelle</MenuItem>
                    <MenuItem value="Inconnu">Inconnu</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Taille</InputLabel>
                  <Select
                    name="taille"
                    value={newAnimal.taille}
                    onChange={handleAnimalChange}
                    label="Taille"
                    required
                  >
                    <MenuItem value="">Sélectionner</MenuItem>
                    <MenuItem value="petit">Petit</MenuItem>
                    <MenuItem value="moyen">Moyen</MenuItem>
                    <MenuItem value="grand">Grand</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Date d'arrivée"
                  name="dateArrivee"
                  type="date"
                  value={newAnimal.dateArrivee}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isRescue"
                      checked={newAnimal.isRescue}
                      onChange={handleAnimalChange}
                      color="primary"
                    />
                  }
                  label="Animal de sauvetage"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description générale"
                  name="description"
                  value={newAnimal.description}
                  onChange={handleAnimalChange}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description d'adoption"
                  name="descriptionAdoption"
                  value={newAnimal.descriptionAdoption}
                  onChange={handleAnimalChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#3f51b5' }}>
                    Comportements
                  </Typography>
                  <FormGroup>
                    {commonBehaviors.map((behavior) => (
                      <FormControlLabel
                        key={behavior}
                        control={
                          <Checkbox
                            value={behavior}
                            checked={newAnimal.comportement.includes(behavior)}
                            onChange={(e) => handleCheckboxChange(e, 'comportement')}
                            color="primary"
                          />
                        }
                        label={behavior}
                      />
                    ))}
                  </FormGroup>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#3f51b5' }}>
                    Ententes avec
                  </Typography>
                  <FormGroup>
                    {commonCompatibilities.map((compatibility) => (
                      <FormControlLabel
                        key={compatibility}
                        control={
                          <Checkbox
                            value={compatibility}
                            checked={newAnimal.ententeAvec.includes(compatibility)}
                            onChange={(e) => handleCheckboxChange(e, 'ententeAvec')}
                            color="primary"
                          />
                        }
                        label={compatibility}
                      />
                    ))}
                  </FormGroup>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#344767' }}>
                  Images (max 3)
                </Typography>
                <input
                  name="images"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="animal-image-upload"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                  disabled={imagePreviews.length >= 3}
                />
                <label htmlFor="animal-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadFileIcon />}
                    disabled={imagePreviews.length >= 3}
                    sx={{ mb: 2 }}
                  >
                    Télécharger des images
                  </Button>
                </label>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  p: 2,
                  border: '1px dashed #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  {imagePreviews.length > 0 ? (
                    imagePreviews.map((src, index) => (
                      <Box key={index} sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        overflow: 'hidden'
                      }}>
                        <img src={src} alt={`Aperçu ${index}`} style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }} />
                        <IconButton
                          size="small"
                          onClick={() => removeImagePreview(index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: '#f44336',
                            color: 'white',
                            '&:hover': { backgroundColor: '#d32f2f' }
                          }}
                        >
                          <HighlightOffIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <ImageOutlinedIcon /> Aucune image sélectionnée. Téléchargez jusqu'à 3 images pour l'animal.
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <DialogActions sx={{ justifyContent: 'flex-end', pt: 3, borderTop: '1px solid #eee', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                className="btn-primary"
                disabled={loading}
                startIcon={editingAnimal ? <EditIcon /> : <AddIcon />}
              >
                {editingAnimal ? 'Modifier l\'animal' : 'Ajouter l\'animal'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                className="btn-secondary"
                onClick={closeAnimalFormModal}
                disabled={loading}
                startIcon={<CloseIcon />}
              >
                Annuler
              </Button>
            </DialogActions>
          </form>

        </SimpleModal>
      )}

      {/* Modale des détails de l'animal */}
      {animalDetailModal && (
        <SimpleModal onClose={() => setAnimalDetailModal(null)} title={`Détails de ${animalDetailModal.nom}`}>
          <div className="animal-details-modal-content">
            <div className="detail-images">
              {animalDetailModal.images && animalDetailModal.images.length > 0 ? (
                animalDetailModal.images.map((img, index) => {
                  const isAbsoluteUrl = img.startsWith('http') || img.startsWith('blob:');
                  const imageSrc = isAbsoluteUrl ? img : `${API_BASE_URL}/${img}`;
                  return (
                    <img
                      key={index}
                      src={imageSrc}
                      alt={`${animalDetailModal.nom} image ${index + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/150x150/EEEEEE/888888?text=Image+introuvable";
                      }}
                    />
                  );
                })
              ) : (
                <p>Aucune image disponible.</p>
              )}
            </div>
            <div className="detail-info-grid">
              <div className="detail-item"><strong>ID:</strong> {animalDetailModal._id}</div>
              <div className="detail-item"><strong>Nom:</strong> {animalDetailModal.nom}</div>
              <div className="detail-item"><strong>Espèce:</strong> {animalDetailModal.espece}</div>
              <div className="detail-item"><strong>Race:</strong> {animalDetailModal.race || 'N/A'}</div>
              <div className="detail-item"><strong>Âge:</strong> {animalDetailModal.age} ans</div>
              <div className="detail-item"><strong>Sexe:</strong> {animalDetailModal.sexe}</div>
              <div className="detail-item"><strong>Taille:</strong> {animalDetailModal.taille || 'N/A'}</div>
              <div className="detail-item"><strong>Date d'arrivée:</strong> {new Date(animalDetailModal.dateArrivee).toLocaleDateString()}</div>
              <div className="detail-item"><strong>Sauvetage:</strong> {animalDetailModal.isRescue ? 'Oui' : 'Non'}</div>
              <div className="detail-item">
                <strong>Statut:</strong>
                <Chip
                  label={animalDetailModal.adopte ? 'Adopté' : 'Disponible'}
                  icon={animalDetailModal.adopte ? <CheckIcon /> : <PetsIcon />}
                  color={animalDetailModal.adopte ? 'success' : 'primary'}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </div>
            </div>
            <div className="detail-section full-width">
              <strong>Description générale:</strong>
              <p>{animalDetailModal.description}</p>
            </div>
            <div className="detail-section full-width">
              <strong>Description d'adoption:</strong>
              <p>{animalDetailModal.descriptionAdoption}</p>
            </div>
            <div className="detail-section">
              <strong>Comportements:</strong>
              <p>{animalDetailModal.comportement?.length > 0 ? animalDetailModal.comportement.join(', ') : 'Aucun'}</p>
            </div>
            <div className="detail-section">
              <strong>Ententes avec:</strong>
              <p>{animalDetailModal.ententeAvec?.length > 0 ? animalDetailModal.ententeAvec.join(', ') : 'Aucune'}</p>
            </div>
          </div>
        </SimpleModal>
      )}

      {/* Modale des détails du commentaire */}
      {commentDetailModal && (
        <SimpleModal onClose={() => setCommentDetailModal(null)} title={`Détails du commentaire de ${commentDetailModal.username}`}>
          <div className="comment-details-modal-content">
            <p><strong>Auteur:</strong> {commentDetailModal.username}</p>
            <p><strong>Date:</strong> {new Date(commentDetailModal.createdAt).toLocaleDateString()}</p>
            <p><strong>Note:</strong> {commentDetailModal.rating} / 5</p>
            <div className="comment-full-content-section">
              <strong>Contenu:</strong>
              <p>{commentDetailModal.commentText}</p>
            </div>
          </div>
        </SimpleModal>
      )}

      {/* Modale de confirmation générale (utilise MUI Dialog en interne) */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirm={confirmationModal.onConfirm}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default BackOffice;