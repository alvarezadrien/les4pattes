import React, { useState, useEffect, useCallback } from 'react';
import './Back_office.css'; // Assurez-vous que ce fichier CSS est correct et à jour

// --- Importation des composants Material-UI ---
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

// --- URL de base de votre API Backend ---
// C'est la SEULE LIGNE À MODIFIER pour pointer vers votre API Render !
const API_BASE_URL = 'https://les4pattes-backend.onrender.com/api';

// --- Composant Modal de Confirmation Réutilisable (Utilise MUI Dialog) ---
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
  const [activeView, setActiveView] = useState('animals'); // 'animals', 'users', 'comments'

  // États de gestion des animaux
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    generalDescription: '',
    adoptionDescription: '',
    arrivalDate: '',
    isRescue: false,
    behaviors: [],
    compatibilities: [],
    images: [] // Stocke les objets Fichier ou URLs pour l'aperçu
  });
  const [editingAnimal, setEditingAnimal] = useState(null); // Stocke l'animal en cours d'édition
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]); // Stocke les URL.createObjectURL pour les nouveaux fichiers ou les URL existantes
  const [isAnimalFormModalOpen, setIsAnimalFormModalOpen] = useState(false);
  const [animalDetailModal, setAnimalDetailModal] = useState(null); // Pour afficher les détails de l'animal

  // États de gestion des utilisateurs
  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // États de gestion des commentaires
  const [comments, setComments] = useState([]);
  const [commentDetailModal, setCommentDetailModal] = useState(null); // Pour afficher les détails du commentaire

  // États globaux de l'interface utilisateur
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    data: null // Pour passer l'ID/objet de l'élément au gestionnaire de confirmation
  });

  // Fonction générique pour afficher les messages de feedback
  const showFeedback = useCallback((type, message) => {
    setFeedbackMessage({ type, message });
    setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000); // Le message disparaît après 3 secondes
  }, []);

  // Fonction générique pour récupérer les données de l'API
  const fetchData = useCallback(async (endpoint, setter, errorMessage) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        // Tenter de lire le message d'erreur du backend
        const errorData = await response.json();
        throw new Error(errorData.message || errorMessage);
      }
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Erreur lors du chargement des ${endpoint}:`, error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [showFeedback]); // showFeedback est une dépendance ici car elle est utilisée

  // Effet pour récupérer les données initiales au montage du composant
  useEffect(() => {
    fetchData('animals', setAnimals, 'Échec du chargement des animaux.');
    fetchData('users', setUsers, 'Échec du chargement des utilisateurs.');
    fetchData('comments', setComments, 'Échec du chargement des commentaires.');
  }, [fetchData]); // Le tableau de dépendances inclut fetchData

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
      const currentList = prev[field];
      if (checked) {
        return { ...currentList, [field]: [...currentList, value] };
      } else {
        return { ...currentList, [field]: currentList.filter(item => item !== value) };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    const newImageFiles = [];

    files.forEach(file => {
      // Limite à 3 images au total
      if (imagePreviews.length + newImageFiles.length < 3) {
        newImageFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      } else {
        showFeedback('error', 'Vous pouvez télécharger un maximum de 3 images.');
      }
    });

    setNewAnimal(prev => ({
      ...prev,
      images: [...prev.images, ...newImageFiles] // Ajoute les objets File
    }));
    setImagePreviews(prev => [...prev, ...newPreviews]); // Ajoute les URLs pour l'aperçu
  };

  const removeImagePreview = (indexToRemove) => {
    // Révoquer l'URL de l'objet pour libérer de la mémoire (important pour les URL de blob)
    const urlToRevoke = imagePreviews[indexToRemove];
    if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRevoke);
    }

    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

    // Note: Cette logique suppose que les "images" dans newAnimal sont soit des URLs existantes, soit des objets File.
    // Si vous envoyez des FormData avec des fichiers, vous devrez ajuster pour ne supprimer que le fichier correspondant
    // Ou, plus simple: lors de l'envoi au backend, filtrez les images par leur type (File vs String URL).
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
    let method = isEditing ? 'PUT' : 'POST';
    let url = isEditing ? `${API_BASE_URL}/animals/${editingAnimal._id}` : `${API_BASE_URL}/animals`;

    // IMPORTANT: Pour la gestion des images réelles, votre backend aura besoin d'une librairie
    // comme `multer` pour parser les FormData. Pour le moment, notre backend accepte du JSON.
    // Pour simplifier l'intégration actuelle sans gérer l'upload de fichiers sur le backend directement depuis le front,
    // nous allons envoyer un tableau d'URLs pour les images.
    // Dans un scénario réel, vous enverriez les fichiers à un service de stockage (Cloudinary, S3, etc.)
    // qui vous renverrait des URLs à stocker en DB.
    // Pour cette démo, nous allons juste stocker les URLs des aperçus ou les URLs existantes comme si elles étaient finales.
    const imagesToSave = imagePreviews.filter(url => !url.startsWith('blob:')).concat(
      newAnimal.images.map(file => {
        // Pour les nouvelles images (objets File), nous ne pouvons pas les envoyer directement
        // en JSON. Dans un vrai cas, il faudrait les uploader séparemment et obtenir des URLs.
        // Ici, nous allons simuler en ne prenant que les URLs existantes ou les noms de fichier pour la démo.
        // Adaptez ceci si votre backend gère un upload direct de fichiers via FormData.
        return file instanceof File ? file.name : file; // Garde les noms de fichiers ou les URLs existantes
      }).filter(Boolean) // Filtrer les valeurs null ou undefined si certains éléments sont vides
    );


    // Assurez-vous que l'âge est un nombre
    const animalData = {
      ...newAnimal,
      age: Number(newAnimal.age),
      images: imagesToSave // Envoi des URLs d'images au lieu des objets File
    };
    // Supprimer la propriété '_id' si elle existe pour un POST (MongoDB la générera)
    if (!isEditing && animalData._id) {
      delete animalData._id;
    }


    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur lors de ${isEditing ? 'la modification' : 'l\'ajout'} de l'animal.`);
      }

      const resultAnimal = await response.json();

      if (!isEditing) {
        setAnimals(prev => [...prev, resultAnimal]);
        showFeedback('success', 'Animal ajouté avec succès !');
      } else {
        setAnimals(prev => prev.map(animal => animal._id === resultAnimal._id ? resultAnimal : animal));
        showFeedback('success', 'Animal mis à jour avec succès !');
      }

      closeAnimalFormModal(); // Fermer et réinitialiser le formulaire

    } catch (error) {
      console.error('Erreur API:', error);
      showFeedback('error', `Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnimalClick = () => {
    setNewAnimal({
      name: '', species: '', breed: '', age: '', gender: '', size: '',
      generalDescription: '', adoptionDescription: '', arrivalDate: '',
      isRescue: false, behaviors: [], compatibilities: [], images: []
    });
    setImagePreviews([]);
    setEditingAnimal(null);
    setIsAnimalFormModalOpen(true);
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
    setNewAnimal({
      // Utilisez l'ID de MongoDB (_id) comme identifiant
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      gender: animal.gender,
      size: animal.size,
      generalDescription: animal.generalDescription,
      adoptionDescription: animal.adoptionDescription,
      // Formater la date en 'YYYY-MM-DD' pour l'input type="date"
      arrivalDate: animal.arrivalDate ? new Date(animal.arrivalDate).toISOString().split('T')[0] : '',
      isRescue: animal.isRescue,
      behaviors: [...animal.behaviors], // Copie profonde pour les cases à cocher
      compatibilities: [...animal.compatibilities], // Copie profonde
      images: [] // Les nouvelles images seront gérées par input type="file"
    });
    setImagePreviews([...animal.images]); // Afficher les images existantes (URL)
    setIsAnimalFormModalOpen(true);
  };

  const closeAnimalFormModal = () => {
    // Révoquer toutes les URL de blob restantes lors de la fermeture de la modale pour éviter les fuites de mémoire
    imagePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setIsAnimalFormModalOpen(false);
    setEditingAnimal(null);
    setNewAnimal({
      name: '', species: '', breed: '', age: '', gender: '', size: '',
      generalDescription: '', adoptionDescription: '', arrivalDate: '',
      isRescue: false, behaviors: [], compatibilities: [], images: []
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
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la suppression de l\'animal.');
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

  const handleChangeAnimalStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Adopted' : 'Available';
    openConfirmationModal(
      `Changer le statut de l'animal ?`,
      `Voulez-vous vraiment changer le statut de cet animal en "${newStatus === 'Available' ? 'Disponible' : 'Adopté'}" ?`,
      executeChangeAnimalStatus,
      { id, newStatus }
    );
  };

  const executeChangeAnimalStatus = async ({ id, newStatus }) => {
    setLoading(true);
    setFeedbackMessage({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}/status`, {
        method: 'PATCH', // Utilisez PATCH pour une mise à jour partielle
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la mise à jour du statut.');
      }

      const updatedAnimal = await response.json();
      setAnimals(prev => prev.map(animal => animal._id === id ? updatedAnimal : animal));
      showFeedback('success', `Statut de l'animal mis à jour en "${newStatus === 'Available' ? 'Disponible' : 'Adopté'}" !`);
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
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la suppression de l\'utilisateur.');
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
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la suppression du commentaire.');
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

  // Animaux filtrés pour l'affichage (recherche côté client)
  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Utilisateurs filtrés pour l'affichage (recherche côté client)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Options communes pour les cases à cocher (behaviors et compatibilities)
  const commonBehaviors = ['Joueur', 'Calme', 'Énergique', 'Timide', 'Curieux', 'Indépendant', 'Affectueux', 'Protecteur'];
  const commonCompatibilities = ['Enfants', 'Chiens', 'Chats', 'Petits animaux', 'Adultes', 'Séniors'];

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
                        <tr key={animal._id}> {/* Utilisez _id de MongoDB */}
                          <td>{animal._id.substring(0, 6)}...</td> {/* Tronquer l'ID pour l'affichage */}
                          <td>{animal.name}</td>
                          <td>{animal.species}</td>
                          <td>{animal.breed}</td>
                          <td>{animal.age} ans</td>
                          <td>
                            <Chip
                              label={animal.status === 'Available' ? 'Disponible' : 'Adopté'}
                              icon={animal.status === 'Available' ? <PetsIcon /> : <CheckIcon />}
                              color={animal.status === 'Available' ? 'primary' : 'success'}
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
                              className={`btn-icon ${animal.status === 'Available' ? 'btn-adopt' : 'btn-unadopt'}`}
                              onClick={() => handleChangeAnimalStatus(animal._id, animal.status)}
                              title={animal.status === 'Available' ? 'Marquer Adopté' : 'Marquer Disponible'}
                            >
                              {animal.status === 'Available' ? <CheckIcon /> : <PetsIcon />}
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
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Date d'inscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <tr key={user._id}> {/* Utilisez _id de MongoDB */}
                          <td>{user._id.substring(0, 6)}...</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <Chip
                              label={user.role}
                              icon={<PersonIcon />}
                              color={user.role === 'Admin' ? 'secondary' : 'default'}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td> {/* Afficher la date formatée */}
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
                      <th>Email</th>
                      <th>Contenu</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.length > 0 ? (
                      comments.map(comment => (
                        <tr key={comment._id}> {/* Utilisez _id de MongoDB */}
                          <td>{comment._id.substring(0, 6)}...</td>
                          <td>{comment.author}</td>
                          <td>{comment.email}</td>
                          <td className="comment-content-cell" title={comment.content}>{comment.content}</td>
                          <td>{new Date(comment.date).toLocaleDateString()}</td> {/* Afficher la date formatée */}
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-view" onClick={() => handleViewCommentDetails(comment)} title="Voir le commentaire complet">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteComment(comment._id)} title="Supprimer commentaire">
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data">Aucun commentaire reçu.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modale du formulaire d'animal */}
      {isAnimalFormModalOpen && (
        <SimpleModal onClose={closeAnimalFormModal} title={editingAnimal ? `Modifier l'animal : ${editingAnimal.name}` : 'Ajouter un nouvel animal'}>
          <form onSubmit={handleSubmitAnimal} className="modal-form animal-form">
            <Grid container spacing={3}> {/* Utilisation de MUI Grid pour la mise en page */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  value={newAnimal.name}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Espèce"
                  name="species"
                  value={newAnimal.species}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Race"
                  name="breed"
                  value={newAnimal.breed}
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
                    name="gender"
                    value={newAnimal.gender}
                    onChange={handleAnimalChange}
                    label="Sexe"
                    required
                  >
                    <MenuItem value="">Sélectionner</MenuItem>
                    <MenuItem value="Mâle">Mâle</MenuItem>
                    <MenuItem value="Femelle">Femelle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Taille"
                  name="size"
                  value={newAnimal.size}
                  onChange={handleAnimalChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Date d'arrivée"
                  name="arrivalDate"
                  type="date"
                  value={newAnimal.arrivalDate}
                  onChange={handleAnimalChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }} // Toujours réduire le libellé pour l'input de date
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
                  name="generalDescription"
                  value={newAnimal.generalDescription}
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
                  name="adoptionDescription"
                  value={newAnimal.adoptionDescription}
                  onChange={handleAnimalChange}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                  <Typography variant="h6" component="div" sx={{ mb: 2, color: '#3f51b5' }}>
                    Comportements
                  </Typography>
                  <FormGroup>
                    {commonBehaviors.map(behavior => (
                      <FormControlLabel
                        key={behavior}
                        control={
                          <Checkbox
                            value={behavior}
                            checked={newAnimal.behaviors.includes(behavior)}
                            onChange={(e) => handleCheckboxChange(e, 'behaviors')}
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
                  <Typography variant="h6" component="div" sx={{ mb: 2, color: '#3f51b5' }}>
                    Ententes avec
                  </Typography>
                  <FormGroup>
                    {commonCompatibilities.map(compatibility => (
                      <FormControlLabel
                        key={compatibility}
                        control={
                          <Checkbox
                            value={compatibility}
                            checked={newAnimal.compatibilities.includes(compatibility)}
                            onChange={(e) => handleCheckboxChange(e, 'compatibilities')}
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
                <Typography variant="h6" component="div" sx={{ mb: 2, color: '#344767' }}>
                  Images (max 3)
                </Typography>
                <input
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2, border: '1px dashed #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                  {imagePreviews.length > 0 ? (
                    imagePreviews.map((src, index) => (
                      <Box key={index} sx={{ position: 'relative', width: 100, height: 100, border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                        <img src={src} alt={`Aperçu ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ImageOutlinedIcon /> Aucune image sélectionnée. Téléchargez jusqu'à 3 images pour l'animal.
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <DialogActions sx={{ justifyContent: 'flex-end', pt: 3, borderTop: '1px solid #eee', mt: 3 }}>
              <Button type="submit" variant="contained" className="btn-primary" disabled={loading} startIcon={editingAnimal ? <EditIcon /> : <AddIcon />}>
                {editingAnimal ? 'Modifier l\'animal' : 'Ajouter l\'animal'}
              </Button>
              <Button type="button" variant="outlined" className="btn-secondary" onClick={closeAnimalFormModal} disabled={loading} startIcon={<CloseIcon />}>
                Annuler
              </Button>
            </DialogActions>
          </form>
        </SimpleModal>
      )}

      {/* Modale des détails de l'animal */}
      {animalDetailModal && (
        <SimpleModal onClose={() => setAnimalDetailModal(null)} title={`Détails de ${animalDetailModal.name}`}>
          <div className="animal-details-modal-content">
            <div className="detail-images">
              {animalDetailModal.images.length > 0 ? (
                animalDetailModal.images.map((img, index) => (
                  <img key={index} src={img} alt={`${animalDetailModal.name} image ${index + 1}`} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/EEEEEE/888888?text=Image+introuvable"; }} />
                ))
              ) : (
                <p>Aucune image disponible.</p>
              )}
            </div>
            <div className="detail-info-grid">
              <div className="detail-item"><strong>ID:</strong> {animalDetailModal._id}</div>
              <div className="detail-item"><strong>Nom:</strong> {animalDetailModal.name}</div>
              <div className="detail-item"><strong>Espèce:</strong> {animalDetailModal.species}</div>
              <div className="detail-item"><strong>Race:</strong> {animalDetailModal.breed || 'N/A'}</div>
              <div className="detail-item"><strong>Âge:</strong> {animalDetailModal.age} ans</div>
              <div className="detail-item"><strong>Sexe:</strong> {animalDetailModal.gender}</div>
              <div className="detail-item"><strong>Taille:</strong> {animalDetailModal.size || 'N/A'}</div>
              <div className="detail-item"><strong>Date d'arrivée:</strong> {new Date(animalDetailModal.arrivalDate).toLocaleDateString()}</div>
              <div className="detail-item"><strong>Sauvetage:</strong> {animalDetailModal.isRescue ? 'Oui' : 'Non'}</div>
              <div className="detail-item">
                <strong>Statut:</strong>
                <Chip
                  label={animalDetailModal.status === 'Available' ? 'Disponible' : 'Adopté'}
                  icon={animalDetailModal.status === 'Available' ? <PetsIcon /> : <CheckIcon />}
                  color={animalDetailModal.status === 'Available' ? 'primary' : 'success'}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </div>
            </div>
            <div className="detail-section full-width">
              <strong>Description générale:</strong>
              <p>{animalDetailModal.generalDescription}</p>
            </div>
            <div className="detail-section full-width">
              <strong>Description d'adoption:</strong>
              <p>{animalDetailModal.adoptionDescription}</p>
            </div>
            <div className="detail-section">
              <strong>Comportements:</strong>
              <p>{animalDetailModal.behaviors.length > 0 ? animalDetailModal.behaviors.join(', ') : 'Aucun'}</p>
            </div>
            <div className="detail-section">
              <strong>Ententes avec:</strong>
              <p>{animalDetailModal.compatibilities.length > 0 ? animalDetailModal.compatibilities.join(', ') : 'Aucune'}</p>
            </div>
          </div>
        </SimpleModal>
      )}

      {/* Modale des détails du commentaire */}
      {commentDetailModal && (
        <SimpleModal onClose={() => setCommentDetailModal(null)} title={`Détails du commentaire de ${commentDetailModal.author}`}>
          <div className="comment-details-modal-content">
            <p><strong>Auteur:</strong> {commentDetailModal.author}</p>
            <p><strong>Email:</strong> {commentDetailModal.email}</p>
            <p><strong>Date:</strong> {new Date(commentDetailModal.date).toLocaleDateString()}</p>
            <div className="comment-full-content-section">
              <strong>Contenu:</strong>
              <p>{commentDetailModal.content}</p>
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