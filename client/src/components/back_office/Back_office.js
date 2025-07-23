import React, { useState, useEffect, useCallback } from 'react';
import './Back_office.css';

// --- Importation des composants Material-UI ---
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, IconButton, CircularProgress, Box, Chip
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
import CheckIcon from '@mui/icons-material/Check'; // For 'Adopted' status
import PersonIcon from '@mui/icons-material/Person'; // For 'User' role
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // More appropriate for confirmation

// --- Reusable Confirmation Modal Component (Utilise MUI Dialog) ---
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
            backgroundColor: '#f44336', // Red for delete/confirm dangerous action
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
            borderColor: '#90a4ae', // Grey border for cancel
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


// --- Reusable Simple Modal Component (Utilise MUI Dialog) ---
const SimpleModal = ({ children, onClose, title }) => {
  return (
    <Dialog
      open={true} // Always open when rendered
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      maxWidth="md" // Medium size modal
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


// --- Main BackOffice Component ---
const BackOffice = () => {
  // State for managing active section visibility in the grid
  const [activeView, setActiveView] = useState('animals'); // 'animals', 'users', 'comments'

  // Animal Management States
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
    images: [] // Storing File objects directly for upload
  });
  const [editingAnimal, setEditingAnimal] = useState(null); // Stores the animal being edited
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]); // Stores URL.createObjectURL strings for new files or existing URLs
  const [isAnimalFormModalOpen, setIsAnimalFormModalOpen] = useState(false);
  const [animalDetailModal, setAnimalDetailModal] = useState(null); // For viewing animal details

  // User Management States
  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Comment Management States
  const [comments, setComments] = useState([]);
  const [commentDetailModal, setCommentDetailModal] = useState(null); // For viewing comment details

  // Global UI States
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    data: null // To pass item ID/object to confirmation handler
  });

  // Effect to fetch initial data (always runs as there's no auth)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFeedbackMessage({ type: '', message: '' }); // Clear any previous feedback

      try {
        // In a real app, you would fetch data from your API here.
        // Example for animals:
        // const animalsResponse = await fetch('https://les4pattes-backend.onrender.com/api/animals');
        // if (!animalsResponse.ok) throw new Error('Échec du chargement des animaux.');
        // const animalsData = await animalsResponse.json();
        // setAnimals(animalsData);

        // Dummy Data for demonstration (replace with actual API calls)
        setTimeout(() => {
          setAnimals([
            { id: 1, name: 'Fido', species: 'Dog', breed: 'Golden Retriever', age: 3, gender: 'Male', size: 'Large', generalDescription: 'Friendly dog, loves kids and long walks.', adoptionDescription: 'Needs a loving home with a yard and active family.', arrivalDate: '2023-01-15', isRescue: true, behaviors: ['Playful', 'Energetic'], compatibilities: ['Kids', 'Dogs'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Fido1', 'https://via.placeholder.com/150/4682B4/FFFFFF?text=Fido2', 'https://via.placeholder.com/150/6495ED/FFFFFF?text=Fido3'], status: 'Available' },
            { id: 2, name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 2, gender: 'Female', size: 'Medium', generalDescription: 'Calm and independent cat, enjoys quiet evenings.', adoptionDescription: 'Perfect for a quiet household, loves to nap in sunbeams.', arrivalDate: '2023-03-20', isRescue: false, behaviors: ['Quiet', 'Independent'], compatibilities: ['Adults'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Whisker1'], status: 'Adopted' },
            { id: 3, name: 'Pipsqueak', species: 'Hamster', breed: 'Syrian', age: 0.5, gender: 'Female', size: 'Small', generalDescription: 'Tiny and active, loves her wheel.', adoptionDescription: 'Great first pet, needs a spacious cage.', arrivalDate: '2024-01-10', isRescue: false, behaviors: ['Energetic', 'Nocturnal'], compatibilities: ['None'], images: ['https://via.placeholder.com/150/87CEEB/FFFFFF?text=Pipsqueak1'], status: 'Available' }
          ]);
          setUsers([
            { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', registeredDate: '2022-11-01' },
            { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', registeredDate: '2023-02-15' },
            { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User', registeredDate: '2023-07-20' }
          ]);
          setComments([
            { id: 1, author: 'Charlie Brown', email: 'charlie@example.com', content: 'Great website! I love the mission. This is a very long comment to test the wrapping and truncation in the table. I hope it works well and demonstrates the functionality as expected.', date: '2023-05-10' },
            { id: 2, author: 'Diana Prince', email: 'diana@example.com', content: 'The animals all look so happy. Looking to adopt!', date: '2023-06-01' },
            { id: 3, author: 'Bruce Wayne', email: 'bruce@example.com', content: 'Fantastic resource for animal lovers.', date: '2024-01-20' }
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
  }, []); // Empty dependency array means it runs once on mount

  // --- Confirmation Modal Handler ---
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

  // --- Animal Management Functions ---
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
        // For previewing newly selected files immediately
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
    // Revoke the object URL to free up memory (important for blob URLs)
    const urlToRevoke = imagePreviews[indexToRemove];
    if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRevoke);
    }

    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    // Also remove the corresponding file from newAnimal.images if it's a newly added file
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
      // In a real app, you'd create FormData to send files and data
      // const formData = new FormData();
      // formData.append('name', newAnimal.name);
      // ... append other fields ...
      // newAnimal.images.forEach(file => {
      //     if (file instanceof File) { // Only append actual File objects for upload
      //         formData.append('images', file);
      //     }
      // });
      // If editing, handle existing image URLs separately or based on your backend logic
      // (e.g., send an array of existing URLs + new files)

      // For demonstration, we'll mimic data handling
      const dataToSave = { ...newAnimal };
      if (isEditing) {
        dataToSave.id = editingAnimal.id;
        // When editing, filter out blob URLs if they were just previews of new uploads
        // Keep only the original image URLs (which don't start with 'blob:')
        // and any new File objects from newAnimal.images
        dataToSave.images = imagePreviews.filter(url => !url.startsWith('blob:')).concat(newAnimal.images);
      } else {
        // For new animals, ensure images are just the file objects or their temporary URLs if you send them that way
        dataToSave.images = imagePreviews; // For dummy data display, we'll use previews
      }

      if (!isEditing) {
        // Simulate API call for adding
        // const response = await fetch('https://les4pattes-backend.onrender.com/api/animals', {
        //     method: 'POST',
        //     body: formData // Use formData for files
        // });
        // if (!response.ok) throw new Error('Échec de l\'ajout de l\'animal.');
        // const addedAnimal = await response.json();
        const newId = Math.max(0, ...animals.map(a => a.id)) + 1; // Handle empty array
        setAnimals(prev => [...prev, { ...dataToSave, id: newId, status: 'Available' }]);
        setFeedbackMessage({ type: 'success', message: 'Animal ajouté avec succès !' });
      } else {
        // Simulate API call for updating
        // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${editingAnimal.id}`, {
        //     method: 'PUT', // Or PATCH
        //     body: formData // Use formData for files
        // });
        // if (!response.ok) throw new Error('Échec de la modification de l\'animal.');
        // const updatedAnimal = await response.json();
        setAnimals(prev => prev.map(animal => animal.id === editingAnimal.id ? { ...animal, ...dataToSave, status: animal.status } : animal));
        setFeedbackMessage({ type: 'success', message: 'Animal mis à jour avec succès !' });
      }

      closeAnimalFormModal(); // Close and reset form

    } catch (error) {
      console.error('API Error:', error);
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
      behaviors: [...animal.behaviors], // Deep copy for checkboxes
      compatibilities: [...animal.compatibilities], // Deep copy
      images: [] // New images will be handled by input type="file"
    });
    setImagePreviews([...animal.images]); // Display existing images (URLs)
    setIsAnimalFormModalOpen(true);
  };

  const closeAnimalFormModal = () => {
    // Revoke any remaining blob URLs when closing the modal to prevent memory leaks
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
      // Simulate API call for deleting
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression de l\'animal.');

      setAnimals(prev => prev.filter(animal => animal.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Animal supprimé avec succès !' });
    } catch (error) {
      console.error('API Error:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleChangeAnimalStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Adopted' : 'Available';
    // You could also use a confirmation modal here for status change if desired
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
      // Simulate API call for status update
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/animals/${id}/status`, {
      //     method: 'PATCH',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ status: newStatus })
      // });
      // if (!response.ok) throw new Error('Échec de la mise à jour du statut.');

      setAnimals(prev => prev.map(animal => animal.id === id ? { ...animal, status: newStatus } : animal));
      setFeedbackMessage({ type: 'success', message: `Statut de l'animal mis à jour en "${newStatus}" !` });
    } catch (error) {
      console.error('API Error:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la mise à jour du statut.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleViewAnimalDetails = (animal) => {
    setAnimalDetailModal(animal);
  };

  // --- User Management Functions ---
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
      // Simulate API call for deleting user
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/users/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression de l\'utilisateur.');

      setUsers(prev => prev.filter(user => user.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Utilisateur supprimé avec succès !' });
    } catch (error) {
      console.error('API Error:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression de l\'utilisateur.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  // --- Comment Management Functions ---
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
      // Simulate API call for deleting comment
      // const response = await fetch(`https://les4pattes-backend.onrender.com/api/comments/${id}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Échec de la suppression du commentaire.');

      setComments(prev => prev.filter(comment => comment.id !== id));
      setFeedbackMessage({ type: 'success', message: 'Commentaire supprimé avec succès !' });
    } catch (error) {
      console.error('API Error:', error);
      setFeedbackMessage({ type: 'error', message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression du commentaire.'}` });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedbackMessage({ type: '', message: '' }), 3000);
    }
  };

  const handleViewCommentDetails = (comment) => {
    setCommentDetailModal(comment);
  };


  // Filtered Animals for display
  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Common Checkbox Options
  const commonBehaviors = ['Playful', 'Calm', 'Energetic', 'Shy', 'Curious', 'Independent', 'Affectionate', 'Protective'];
  const commonCompatibilities = ['Kids', 'Dogs', 'Cats', 'Small Animals', 'Adults', 'Seniors'];

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
              <button className="btn btn-add" onClick={handleAddAnimalClick}>
                <AddIcon /> Ajouter un animal
              </button>
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

      {/* Animal Form Modal */}
      {isAnimalFormModalOpen && (
        <SimpleModal onClose={closeAnimalFormModal} title={editingAnimal ? `Modifier l'animal : ${editingAnimal.name}` : 'Ajouter un nouvel animal'}>
          <form onSubmit={handleSubmitAnimal} className="modal-form animal-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Nom:</label>
                <input type="text" name="name" value={newAnimal.name} onChange={handleAnimalChange} required />
              </div>
              <div className="form-group">
                <label>Espèce:</label>
                <input type="text" name="species" value={newAnimal.species} onChange={handleAnimalChange} required />
              </div>
              <div className="form-group">
                <label>Race:</label>
                <input type="text" name="breed" value={newAnimal.breed} onChange={handleAnimalChange} />
              </div>
              <div className="form-group">
                <label>Âge (ans):</label>
                <input type="number" name="age" value={newAnimal.age} onChange={handleAnimalChange} min="0" />
              </div>
              <div className="form-group">
                <label>Sexe:</label>
                <select name="gender" value={newAnimal.gender} onChange={handleAnimalChange} required>
                  <option value="">Sélectionner</option>
                  <option value="Male">Mâle</option>
                  <option value="Female">Femelle</option>
                </select>
              </div>
              <div className="form-group">
                <label>Taille:</label>
                <input type="text" name="size" value={newAnimal.size} onChange={handleAnimalChange} />
              </div>
              <div className="form-group">
                <label>Date d'arrivée:</label>
                <input type="date" name="arrivalDate" value={newAnimal.arrivalDate} onChange={handleAnimalChange} required />
              </div>
              <div className="form-group checkbox-group">
                <label>Sauvetage:</label>
                <input type="checkbox" name="isRescue" checked={newAnimal.isRescue} onChange={handleAnimalChange} />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description générale:</label>
              <textarea name="generalDescription" value={newAnimal.generalDescription} onChange={handleAnimalChange} rows="3" required></textarea>
            </div>
            <div className="form-group full-width">
              <label>Description d'adoption:</label>
              <textarea name="adoptionDescription" value={newAnimal.adoptionDescription} onChange={handleAnimalChange} rows="3" required></textarea>
            </div>

            <div className="form-grid checkbox-selection-grid">
              <div className="form-group checkbox-section">
                <label>Comportements:</label>
                <div className="checkbox-list">
                  {commonBehaviors.map(behavior => (
                    <label key={behavior}>
                      <input
                        type="checkbox"
                        value={behavior}
                        checked={newAnimal.behaviors.includes(behavior)}
                        onChange={(e) => handleCheckboxChange(e, 'behaviors')}
                      />
                      {behavior}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group checkbox-section">
                <label>Ententes avec:</label>
                <div className="checkbox-list">
                  {commonCompatibilities.map(compatibility => (
                    <label key={compatibility}>
                      <input
                        type="checkbox"
                        value={compatibility}
                        checked={newAnimal.compatibilities.includes(compatibility)}
                        onChange={(e) => handleCheckboxChange(e, 'compatibilities')}
                      />
                      {compatibility}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Images (max 3):</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={imagePreviews.length >= 3} />
              <div className="image-previews">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={src} alt={`preview ${index}`} />
                    <button type="button" onClick={() => removeImagePreview(index)} title="Supprimer l'image">X</button>
                  </div>
                ))}
              </div>
              {imagePreviews.length === 0 && <p className="help-text">Téléchargez jusqu'à 3 images pour l'animal.</p>}
            </div>

            <div className="modal-actions">
              <Button type="submit" variant="contained" className="btn-primary" disabled={loading} startIcon={editingAnimal ? <EditIcon /> : <AddIcon />}>
                {editingAnimal ? 'Modifier l\'animal' : 'Ajouter l\'animal'}
              </Button>
              <Button type="button" variant="outlined" className="btn-secondary" onClick={closeAnimalFormModal} disabled={loading} startIcon={<CloseIcon />}>
                Annuler
              </Button>
            </div>
          </form>
        </SimpleModal>
      )}

      {/* Animal Detail Modal */}
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

      {/* Comment Detail Modal */}
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

      {/* General Confirmation Modal (uses MUI Dialog internally) */}
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