import React, { useState, useEffect, useCallback } from 'react';
import './Back_office.css';

// --- Importation des composants Material-UI ---
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, IconButton, CircularProgress, Box, Chip,
  TextField, FormControl, InputLabel, Select, MenuItem,
  RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup,
  Grid, Typography, Paper // Ajout de Paper pour mieux structurer les sections
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
import CheckIcon from '@mui/icons-material/Check'; // Pour le statut 'Adopté'
import PersonIcon from '@mui/icons-material/Person'; // Pour le rôle 'User'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Plus approprié pour la confirmation
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'; // Pour le téléchargement d'images
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Pour le bouton de téléchargement
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Pour supprimer l'aperçu d'image

// --- Composant Modal de Confirmation Réutilisable (Utilise MUI Dialog) ---
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmer", cancelText = "Annuler" }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      sx={{ '& .MuiPaper-root': { borderRadius: '12px', padding: '20px' } }} // Styles pour la modale
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ textAlign: 'center', pb: 1 }}>
        <WarningAmberIcon sx={{ fontSize: 48, color: '#ff9800', mb: 1 }} /> {/* Icône d'avertissement */}
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
            backgroundColor: '#f44336', // Rouge pour les actions dangereuses
            '&:hover': { backgroundColor: '#d32f2f' },
            px: 3, py: 1.2, fontSize: '1rem', borderRadius: '8px'
          }}
          startIcon={<DeleteIcon />} // Icône de suppression
        >
          {confirmText}
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor: '#90a4ae', // Bordure grise pour annuler
            color: '#90a4ae',
            '&:hover': { backgroundColor: '#e0e0e0', borderColor: '#78909c' },
            px: 3, py: 1.2, fontSize: '1rem', borderRadius: '8px'
          }}
          startIcon={<CloseIcon />} // Icône de fermeture
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
      open={true} // Toujours ouvert lorsqu'il est rendu
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      maxWidth="md" // Modale de taille moyenne
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
    images: [] // Stocke les objets Fichier directement pour l'upload
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

  // Effet pour récupérer les données initiales (s'exécute toujours car il n'y a pas d'authentification)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFeedbackMessage({ type: '', message: '' }); // Efface tout commentaire précédent

      try {
        // Dans une vraie application, vous récupéreriez les données de votre API ici.
        // Exemple pour les animaux :
        // const animalsResponse = await fetch('https://les4pattes-backend.onrender.com/api/animals');
        // if (!animalsResponse.ok) throw new Error('Échec du chargement des animaux.');
        // const animalsData = await animalsResponse.json();
        // setAnimals(animalsData);

        // Données factices pour la démonstration (à remplacer par des appels API réels)
        setTimeout(() => {
          setAnimals([
            { id: 1, name: 'Fido', species: 'Chien', breed: 'Golden Retriever', age: 3, gender: 'Mâle', size: 'Grand', generalDescription: 'Chien amical, adore les enfants et les longues promenades.', adoptionDescription: 'A besoin d\'un foyer aimant avec un jardin et une famille active.', arrivalDate: '2023-01-15', isRescue: true, behaviors: ['Joueur', 'Énergique'], compatibilities: ['Enfants', 'Chiens'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Fido1', 'https://via.placeholder.com/150/4682B4/FFFFFF?text=Fido2', 'https://via.placeholder.com/150/6495ED/FFFFFF?text=Fido3'], status: 'Available' },
            { id: 2, name: 'Whiskers', species: 'Chat', breed: 'Siamois', age: 2, gender: 'Femelle', size: 'Moyen', generalDescription: 'Chat calme et indépendant, apprécie les soirées tranquilles.', adoptionDescription: 'Parfait pour un foyer calme, aime faire la sieste au soleil.', arrivalDate: '2023-03-20', isRescue: false, behaviors: ['Calme', 'Indépendant'], compatibilities: ['Adultes'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Whisker1'], status: 'Adopted' },
            { id: 3, name: 'Pipsqueak', species: 'Hamster', breed: 'Syrien', age: 0.5, gender: 'Femelle', size: 'Petit', generalDescription: 'Minuscule et actif, adore sa roue.', adoptionDescription: 'Excellent premier animal de compagnie, a besoin d\'une cage spacieuse.', arrivalDate: '2024-01-10', isRescue: false, behaviors: ['Énergique', 'Nocturne'], compatibilities: ['Aucune'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Pipsqueak1'], status: 'Available' }
          ]);
          setUsers([
            { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', registeredDate: '2022-11-01' },
            { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Utilisateur', registeredDate: '2023-02-15' },
            { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Utilisateur', registeredDate: '2023-07-20' }
          ]);
          setComments([
            { id: 1, author: 'Charlie Brown', email: 'charlie@example.com', content: 'Super site web ! J\'adore la mission. Ceci est un très long commentaire pour tester l\'habillage et la troncature dans le tableau. J\'espère que cela fonctionne bien et démontre la fonctionnalité comme prévu.', date: '2023-05-10' },
            { id: 2, author: 'Diana Prince', email: 'diana@example.com', content: 'Les animaux ont tous l\'air si heureux. Je cherche à adopter !', date: '2023-06-01' },
            { id: 3, author: 'Bruce Wayne', email: 'bruce@example.com', content: 'Fantastique ressource pour les amoureux des animaux.', date: '2024-01-20' }
          ]);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Erreur lors du chargement initial des données:', error);
        setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message}. Impossible de charger les données.` });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Le tableau de dépendances vide signifie qu'il ne s'exécute qu'une seule fois au montage

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
        return { ...prev, [field]: [...currentList, value] };
      } else {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = [];
    const newPreviews = [];

    files.forEach(file => {
      if (imagePreviews.length + newImageFiles.length < 3) {
        newImageFiles.push(file);
        // Pour prévisualiser les fichiers nouvellement sélectionnés immédiatement
        newPreviews.push(URL.createObjectURL(file));
      } else {
        setFeedbackMessage({ type: 'error', message: 'Vous pouvez télécharger un maximum de 3 images.' });
        setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
      }
    });

    setNewAnimal(prev => ({
      ...prev,
      images: [...prev.images, ...newImageFiles]
    }));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImagePreview = (indexToRemove) => {
    // Révoquer l'URL de l'objet pour libérer de la mémoire (important pour les URL de blob)
    const urlToRevoke = imagePreviews[indexToRemove];
    if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRevoke);
    }

    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    // Supprimer également le fichier correspondant de newAnimal.images s'il s'agit d'un fichier nouvellement ajouté
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

    try {
      // Dans une vraie application, vous créeriez FormData pour envoyer des fichiers et des données
      // const formData = new FormData();
      // formData.append('name', newAnimal.name);
      // ... ajouter d'autres champs ...
      // newAnimal.images.forEach(file => {
      //     if (file instanceof File) { // N'ajouter que les objets Fichier réels pour l'upload
      //         formData.append('images', file);
      //     }
      // });
      // Si vous modifiez, gérez les URL d'images existantes séparément ou en fonction de la logique de votre backend
      // (par exemple, envoyez un tableau d'URL existantes + de nouveaux fichiers)

      // Pour la démonstration, nous allons simuler la gestion des données
      const dataToSave = { ...newAnimal };
      if (isEditing) {
        dataToSave.id = editingAnimal.id;
        // Lors de l'édition, filtrez les URL de blob si elles n'étaient que des aperçus de nouveaux téléchargements
        // Ne conservez que les URL d'images originales (qui ne commencent pas par 'blob:')
        // et tous les nouveaux objets Fichier de newAnimal.images
        dataToSave.images = imagePreviews.filter(url => !url.startsWith('blob:')).concat(newAnimal.images);
      } else {
        // Pour les nouveaux animaux, assurez-vous que les images ne sont que les objets fichier ou leurs URL temporaires si vous les envoyez de cette façon
        dataToSave.images = imagePreviews; // Pour l'affichage de données factices, nous utiliserons des aperçus
      }

      if (!isEditing) {
        // Simuler l'appel API pour l'ajout
        // const response = await fetch('https://les4pattes-backend.onrender.com/api/animals', {
        //     method: 'POST',
        //     body: formData // Utiliser formData pour les fichiers
        // });
        // if (!response.ok) throw new Error('Échec de l\'ajout de l\'animal.');
        // const addedAnimal = await response.json();
        const newId = Math.max(0, ...animals.map(a => a.id)) + 1; // Gérer le tableau vide
        setAnimals(prev => [...prev, { ...dataToSave, id: newId, status: 'Available' }]);
        setFeedbackMessage({ type: 'success', message: 'Animal ajouté avec succès !' });
      } else {
        // Simuler l'appel API pour la mise à jour
        // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${editingAnimal.id}`, {
        //     method: 'PUT', // Ou PATCH
        //     body: formData // Utiliser formData pour les fichiers
        // });
        // if (!response.ok) throw new Error('Échec de la modification de l\'animal.');
        // const updatedAnimal = await response.json();
        setAnimals(prev => prev.map(animal => animal.id === editingAnimal.id ? { ...animal, ...dataToSave, status: animal.status } : animal));
        setFeedbackMessage({ type: 'success', message: 'Animal mis à jour avec succès !' });
      }

      closeAnimalFormModal(); // Fermer et réinitialiser le formulaire

    } catch (error) {
      console.error('Erreur API:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleAddAnimalClick = () => {
    setNewAnimal({ name: '', species: '', breed: '', age: '', gender: '', size: '', generalDescription: '', adoptionDescription: '', arrivalDate: '', isRescue: false, behaviors: [], compatibilities: [], images: [] });
    setImagePreviews([]);
    setEditingAnimal(null);
    setIsAnimalFormModalOpen(true);
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
    setNewAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      gender: animal.gender,
      size: animal.size,
      generalDescription: animal.generalDescription,
      adoptionDescription: animal.adoptionDescription,
      arrivalDate: animal.arrivalDate,
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
    setNewAnimal({ name: '', species: '', breed: '', age: '', gender: '', size: '', generalDescription: '', adoptionDescription: '', arrivalDate: '', isRescue: false, behaviors: [], compatibilities: [], images: [] });
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
      // Simuler l'appel API pour la suppression
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression de l\'animal.');

      setAnimals(prev => prev.filter(animal => animal.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Animal supprimé avec succès !' });
    } catch (error) {
      console.error('Erreur API:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleChangeAnimalStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Adopted' : 'Available';
    // Vous pourriez également utiliser une modale de confirmation ici pour le changement de statut si vous le souhaitez
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
      // Simuler l'appel API pour la mise à jour du statut
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${id}/status`, {
      //     method: 'PATCH',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ status: newStatus })
      // });
      // if (!response.ok) throw new Error('Échec de la mise à jour du statut.');

      setAnimals(prev => prev.map(animal => animal.id === id ? { ...animal, status: newStatus } : animal));
      setFeedbackMessage({ type: 'success', message: `Statut de l'animal mis à jour en "${newStatus}" !` });
    } catch (error) {
      console.error('Erreur API:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la mise à jour du statut.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
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
      // Simuler l'appel API pour la suppression de l'utilisateur
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/users/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression de l\'utilisateur.');

      setUsers(prev => prev.filter(user => user.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Utilisateur supprimé avec succès !' });
    } catch (error) {
      console.error('Erreur API:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression de l\'utilisateur.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
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
      // Simuler l'appel API pour la suppression du commentaire
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/comments/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression du commentaire.');

      setComments(prev => prev.filter(comment => comment.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Commentaire supprimé avec succès !' });
    } catch (error) {
      console.error('Erreur API:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression du commentaire.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleViewCommentDetails = (comment) => {
    setCommentDetailModal(comment);
  };


  // Animaux filtrés pour l'affichage
  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Options communes pour les cases à cocher
  const commonBehaviors = ['Joueur', 'Calme', 'Énergique', 'Timide', 'Curieux', 'Indépendant', 'Affectueux', 'Protecteur'];
  const commonCompatibilities = ['Enfants', 'Chiens', 'Chats', 'Petits animaux', 'Adultes', 'Séniors'];

  return (
    <div className="back-office-container">
      <h1 className="back-office-title">
        <PetsIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 2 }} /> Back Office - Les 4 Pattes
      </h1>

      {feedbackMessage.message && (
        <div className={`feedback-message ${feedbackMessage.type}`}>
          {feedbackMessage.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
          <span>{feedbackMessage.message}</span>
        </div>
      )}

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
                        <tr key={animal.id}>
                          <td>{animal.id}</td>
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
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteAnimal(animal.id)} title="Supprimer">
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              className={`btn-icon ${animal.status === 'Available' ? 'btn-adopt' : 'btn-unadopt'}`}
                              onClick={() => handleChangeAnimalStatus(animal.id, animal.status)}
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
                        <tr key={user.id}>
                          <td>{user.id}</td>
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
                          <td>{user.registeredDate}</td>
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteUser(user.id)} title="Supprimer utilisateur">
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
                        <tr key={comment.id}>
                          <td>{comment.id}</td>
                          <td>{comment.author}</td>
                          <td>{comment.email}</td>
                          <td className="comment-content-cell" title={comment.content}>{comment.content}</td>
                          <td>{comment.date}</td>
                          <td className="actions-cell">
                            <IconButton className="btn-icon btn-view" onClick={() => handleViewCommentDetails(comment)} title="Voir le commentaire complet">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton className="btn-icon btn-delete" onClick={() => confirmDeleteComment(comment.id)} title="Supprimer commentaire">
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
                  sx={{ mt: 1 }} // Marge supérieure pour l'aligner avec les autres champs
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
              <div className="detail-item"><strong>ID:</strong> {animalDetailModal.id}</div>
              <div className="detail-item"><strong>Nom:</strong> {animalDetailModal.name}</div>
              <div className="detail-item"><strong>Espèce:</strong> {animalDetailModal.species}</div>
              <div className="detail-item"><strong>Race:</strong> {animalDetailModal.breed || 'N/A'}</div>
              <div className="detail-item"><strong>Âge:</strong> {animalDetailModal.age} ans</div>
              <div className="detail-item"><strong>Sexe:</strong> {animalDetailModal.gender}</div>
              <div className="detail-item"><strong>Taille:</strong> {animalDetailModal.size || 'N/A'}</div>
              <div className="detail-item"><strong>Date d'arrivée:</strong> {animalDetailModal.arrivalDate}</div>
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
            <p><strong>Date:</strong> {commentDetailModal.date}</p>
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