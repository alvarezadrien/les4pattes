import React, { useState, useEffect } from "react";
import "./Back_office.css";

function Back_office() {
  const [animals, setAnimals] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    nom: "",
    espece: "Chien",
    race: "",
    age: "",
    sexe: "Mâle",
    taille: "moyen",
    description: "",
    descriptionAdoption: "",
    dateArrivee: "",
    image: "", // Primaire
    image2: "", // Secondaire
    image3: "", // Tertiaire
    images: [], // Pour le stockage des chemins en BDD (tableau)
    comportement: [], // Nouveau champ: tableau vide par défaut
    ententeAvec: [], // Nouveau champ: tableau vide par défaut
    isRescue: false, // NOUVEAU CHAMP : pour indiquer si c'est un sauvetage (isRescue)
  });

  const [openAccordion, setOpenAccordion] = useState({
    animals: true,
    users: false,
    comments: false,
    newAnimalComportement: false, // New accordion for new animal behavior
    newAnimalEntente: false, // New accordion for new animal compatibility
    editAnimalComportement: false, // New accordion for edit animal behavior
    editAnimalEntente: false, // New accordion for edit animal compatibility
  });

  // États pour la pop-up de confirmation
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupAction, setPopupAction] = useState(null); // Fonction à exécuter si confirmé

  // New state for search term
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = `${process.env.REACT_APP_API_URL}/api/animaux`;
  const usersApiUrl = `${process.env.REACT_APP_API_URL}/api/auth/users`;
  const commentsApiUrl = `${process.env.REACT_APP_API_URL}/api/comments`;

  // Fonction pour récupérer les commentaires, peut être appelée après une suppression
  const fetchComments = async () => {
    try {
      const response = await fetch(commentsApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Erreur chargement commentaires:", err);
    }
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error("Erreur chargement animaux:", err));

    fetch(usersApiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur chargement utilisateurs:", err));

    // Initial fetch for comments
    fetchComments();
  }, []); // Empty dependency array means this runs once on component mount

  // Filter animals based on search term
  const filteredAnimals = animals.filter((animal) =>
    animal.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAnimal = () => {
    if (!newAnimal.nom || !newAnimal.espece || !newAnimal.age) return;

    const animalToSend = {
      ...newAnimal,
      images: [newAnimal.image, newAnimal.image2, newAnimal.image3].filter(
        Boolean
      ),
    };

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animalToSend),
    })
      .then((res) => res.json())
      .then((newAddedAnimal) => {
        setAnimals([...animals, newAddedAnimal]);
        setNewAnimal({
          nom: "",
          espece: "Chien",
          race: "",
          age: "",
          sexe: "Mâle",
          taille: "moyen",
          description: "",
          descriptionAdoption: "",
          dateArrivee: "",
          image: "",
          image2: "",
          image3: "",
          images: [],
          comportement: [], // Réinitialiser le comportement
          ententeAvec: [], // Réinitialiser l'entente
          isRescue: false, // Réinitialiser le champ isRescue
        });
      })
      .catch((err) => console.error("Erreur ajout animal:", err));
  };

  // Fonctions de suppression avec confirmation
  const confirmDeleteAnimal = (id) => {
    setPopupMessage("Voulez-vous vraiment supprimer cet animal ?");
    setPopupAction(() => () => {
      // Utilisation d'une fonction pour définir l'action
      fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => setAnimals(animals.filter((a) => a._id !== id)))
        .catch((err) => console.error("Erreur suppression animal:", err));
      setShowPopup(false); // Fermer la pop-up après confirmation
    });
    setShowPopup(true);
  };

  const confirmDeleteUser = (id) => {
    setPopupMessage("Voulez-vous vraiment supprimer cet utilisateur ?");
    setPopupAction(() => () => {
      fetch(`${usersApiUrl}/${id}`, { method: "DELETE" })
        .then(() => setUsers(users.filter((u) => u._id !== id)))
        .catch((err) => console.error("Erreur suppression utilisateur:", err));
      setShowPopup(false);
    });
    setShowPopup(true);
  };

  // Fonction de confirmation pour la suppression d'un commentaire
  const confirmDeleteComment = (id) => {
    setPopupMessage("Voulez-vous vraiment supprimer ce commentaire ?");
    setPopupAction(() => async () => {
      try {
        // IMPORTANT: Récupération du token depuis localStorage
        const token = localStorage.getItem("token");

        // Vérifiez si le token existe avant d'envoyer la requête
        if (!token) {
          throw new Error(
            "Token d'authentification manquant. Veuillez vous reconnecter."
          );
        }

        const response = await fetch(`${commentsApiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Utilisez l'en-tête 'Authorization' avec 'Bearer' comme attendu par le middleware
            Authorization: `Bearer ${token}`, // <-- C'est le changement clé ici !
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.msg || `Erreur HTTP! statut: ${response.status}`
          );
        }

        // Si la suppression est réussie côté serveur, mettez à jour l'état local
        setComments(comments.filter((c) => c._id !== id));
        setShowPopup(false);
      } catch (err) {
        console.error("Erreur suppression commentaire:", err);
        alert(`Échec de la suppression du commentaire: ${err.message}`); // Afficher une alerte utilisateur
        setShowPopup(false);
      }
    });
    setShowPopup(true);
  };

  const handleToggleAdoption = (id, currentStatus) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adopte: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updatedAnimal) => {
        setAnimals(animals.map((a) => (a._id === id ? updatedAnimal : a)));
      })
      .catch((err) => console.error("Erreur mise à jour adoption:", err));
  };

  const handleUpdateDescription = (id, description) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    })
      .then((res) => res.json())
      .then(() =>
        setAnimals(
          animals.map((a) => (a._id === id ? { ...a, description } : a))
        )
      )
      .catch((err) => console.error("Erreur mise à jour description:", err));
  };

  // New handler for descriptionAdoption
  const handleUpdateDescriptionAdoption = (id, descriptionAdoption) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descriptionAdoption }),
    })
      .then((res) => res.json())
      .then(() =>
        setAnimals(
          animals.map((a) =>
            a._id === id ? { ...a, descriptionAdoption } : a
          )
        )
      )
      .catch((err) =>
        console.error("Erreur mise à jour description d'adoption:", err)
      );
  };

  const toggleAccordion = (section) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Updated handleImageChange to accept a state setter function
  const handleImageChange = (e, field, setter) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setter((prev) => ({ ...prev, [field]: imageUrl }));
    }
  };

  const [editAnimalId, setEditAnimalId] = useState(null);
  const [editAnimalData, setEditAnimalData] = useState({});

  const handleEditAnimal = (animal) => {
    setEditAnimalId(animal._id);
    // Initialise editAnimalData avec les valeurs existantes, y compris les images
    setEditAnimalData({
      nom: animal.nom || "",
      espece: animal.espece || "Chien",
      race: animal.race || "",
      age: animal.age || "",
      sexe: animal.sexe || "Mâle",
      taille: animal.taille || "moyen",
      description: animal.description || "",
      descriptionAdoption: animal.descriptionAdoption || "",
      dateArrivee: animal.dateArrivee ? animal.dateArrivee.slice(0, 10) : "",
      // Assurez-vous que les champs image sont initialisés avec les images existantes
      image: animal.images && animal.images[0] ? animal.images[0] : "",
      image2: animal.images && animal.images[1] ? animal.images[1] : "",
      image3: animal.images && animal.images[2] ? animal.images[2] : "",
      images: animal.images || [], // Copie du tableau d'images existant
      comportement: animal.comportement || [], // Initialiser le comportement
      ententeAvec: animal.ententeAvec || [], // Initialiser l'entente
      isRescue: animal.isRescue || false, // NOUVEAU : Initialiser le champ isRescue
    });
  };

  const handleCancelEdit = () => {
    setEditAnimalId(null);
    setEditAnimalData({});
  };

  const handleSaveEditAnimal = (id) => {
    // Reconstruire le tableau 'images' à partir des champs individuels (image, image2, image3)
    const updatedImages = [
      editAnimalData.image,
      editAnimalData.image2,
      editAnimalData.image3,
    ].filter(Boolean); // Filtrer les valeurs vides/nulles

    const animalToUpdate = {
      ...editAnimalData,
      images: updatedImages, // Mettre à jour le tableau d'images
    };
    // Supprimer les champs individuels pour éviter les doublons ou erreurs côté backend si non nécessaires
    delete animalToUpdate.image;
    delete animalToUpdate.image2;
    delete animalToUpdate.image3;

    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animalToUpdate),
    })
      .then((res) => res.json())
      .then((updatedAnimal) => {
        setAnimals(animals.map((a) => (a._id === id ? updatedAnimal : a)));
        setEditAnimalId(null);
        setEditAnimalData({});
      })
      .catch((err) => console.error("Erreur modification animal:", err));
  };

  const handlePopupConfirm = () => {
    if (popupAction) {
      popupAction(); // Exécuter l'action de suppression
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false); // Simplement fermer la pop-up
    setPopupAction(null); // Réinitialiser l'action
  };

  // Helper function to get base file name
  const getFileName = (url) => {
    if (!url) return "";
    try {
      const parts = url.split("/");
      return parts[parts.length - 1];
    } catch (e) {
      return url; // Fallback if URL parsing fails
    }
  };

  // Options pour les select 'comportement' et 'ententeAvec'
  const comportementOptions = [
    "calme",
    "actif",
    "affectueux",
    "independant",
    "sociable",
    "joueur",
    "curieux",
    "calin",
  ];

  const ententeAvecOptions = ["enfants", "chiens", "chats", "familles"];

  // Handle checkbox change for NEW animal form
  const handleCheckboxChange = (e, field, currentValues, setter) => {
    const { value, checked } = e.target;
    if (checked) {
      setter({ ...currentValues, [field]: [...currentValues[field], value] });
    } else {
      setter({
        ...currentValues,
        [field]: currentValues[field].filter((item) => item !== value),
      });
    }
  };

  return (
    <div className="back-office">
      <h1 className="h1_office">Back Office - Gestion du Refuge</h1>

      {/* Pop-up de confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <div className="popup-buttons">
              <button onClick={handlePopupConfirm} className="btn_confirm">
                Confirmer
              </button>
              <button onClick={handlePopupCancel} className="btn_cancel">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="section">
        <h2>Ajouter un animal</h2>
        <form
          className="form-animal"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAnimal();
          }}
        >
          <label>Nom</label>
          <input
            value={newAnimal.nom}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, nom: e.target.value })
            }
          />

          <label>Espèce</label>
          <select
            value={newAnimal.espece}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, espece: e.target.value })
            }
          >
            <option value="Chien">Chien</option>
            <option value="Chat">Chat</option>
          </select>

          <label>Race</label>
          <input
            value={newAnimal.race}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, race: e.target.value })
            }
          />

          <label>Âge</label>
          <input
            type="number"
            value={newAnimal.age}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, age: e.target.value })
            }
          />

          <label>Sexe</label>
          <select
            value={newAnimal.sexe}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, sexe: e.target.value })
            }
          >
            <option value="Mâle">Mâle</option>
            <option value="Femelle">Femelle</option>
            <option value="Inconnu">Inconnu</option>
          </select>

          <label>Taille</label>
          <select
            value={newAnimal.taille}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, taille: e.target.value })
            }
          >
            <option value="petit">Petit</option>
            <option value="moyen">Moyen</option>
            <option value="grand">Grand</option>
          </select>

          {/* NOUVEAU CHAMP : Sauvetage (isRescue) */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isRescueNew"
              checked={newAnimal.isRescue}
              onChange={(e) =>
                setNewAnimal({ ...newAnimal, isRescue: e.target.checked })
              }
            />
            <label htmlFor="isRescueNew">Sauvetage ?</label>
          </div>

          {/* NOUVEAUX CHAMPS ACCORDION : COMPORTEMENT ET ENTENTE AVEC */}
          <h3
            onClick={() => toggleAccordion("newAnimalComportement")}
            className="accordion-header"
          >
            Comportement(s) {openAccordion.newAnimalComportement ? "▲" : "▼"}
          </h3>
          {openAccordion.newAnimalComportement && (
            <div className="accordion-content checkbox-options">
              <p>Sélectionner un ou plusieurs comportements</p>
              {comportementOptions.map((option) => (
                <div key={`new-comportement-${option}`}>
                  <input
                    type="checkbox"
                    id={`new-comportement-${option}`}
                    value={option}
                    checked={newAnimal.comportement.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(e, "comportement", newAnimal, setNewAnimal)
                    }
                  />
                  <label htmlFor={`new-comportement-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          )}

          <h3
            onClick={() => toggleAccordion("newAnimalEntente")}
            className="accordion-header"
          >
            Entente(s) avec {openAccordion.newAnimalEntente ? "▲" : "▼"}
          </h3>
          {openAccordion.newAnimalEntente && (
            <div className="accordion-content checkbox-options">
              <p>Sélectionner un ou plusieurs types d'entente</p>
              {ententeAvecOptions.map((option) => (
                <div key={`new-entente-${option}`}>
                  <input
                    type="checkbox"
                    id={`new-entente-${option}`}
                    value={option}
                    checked={newAnimal.ententeAvec.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(e, "ententeAvec", newAnimal, setNewAnimal)
                    }
                  />
                  <label htmlFor={`new-entente-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          {/* FIN NOUVEAUX CHAMPS ACCORDION */}

          <label>Description</label>
          <textarea
            value={newAnimal.description}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, description: e.target.value })
            }
          />

          <label>Description Adoption</label>
          <textarea
            value={newAnimal.descriptionAdoption}
            onChange={(e) =>
              setNewAnimal({
                ...newAnimal,
                descriptionAdoption: e.target.value,
              })
            }
          />

          <label htmlFor="newAnimalDateArrivee">Date d'arrivée</label>
          <input
            id="newAnimalDateArrivee" // Added ID for specific styling
            type="date"
            value={newAnimal.dateArrivee}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, dateArrivee: e.target.value })
            }
            className="date-input" // Added class for styling
          />

          {/* Styled file inputs for NEW animal */}
          <div className="file-input-wrapper">
            <label htmlFor="image1" className="file-input-label">
              Choisir Image 1
            </label>
            <input
              id="image1"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image", setNewAnimal)}
              className="hidden-file-input"
            />
            {newAnimal.image && (
              <span className="file-name">{getFileName(newAnimal.image)}</span>
            )}
          </div>
          {newAnimal.image && (
            <img
              src={newAnimal.image}
              alt="Preview"
              style={{ maxWidth: "150px", marginTop: "5px" }}
            />
          )}

          <div className="file-input-wrapper">
            <label htmlFor="image2" className="file-input-label">
              Choisir Image 2
            </label>
            <input
              id="image2"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image2", setNewAnimal)}
              className="hidden-file-input"
            />
            {newAnimal.image2 && (
              <span className="file-name">
                {getFileName(newAnimal.image2)}
              </span>
            )}
          </div>
          {newAnimal.image2 && (
            <img
              src={newAnimal.image2}
              alt="Preview"
              style={{ maxWidth: "150px", marginTop: "5px" }}
            />
          )}

          <div className="file-input-wrapper">
            <label htmlFor="image3" className="file-input-label">
              Choisir Image 3
            </label>
            <input
              id="image3"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image3", setNewAnimal)}
              className="hidden-file-input"
            />
            {newAnimal.image3 && (
              <span className="file-name">
                {getFileName(newAnimal.image3)}
              </span>
            )}
          </div>
          {newAnimal.image3 && (
            <img
              src={newAnimal.image3}
              alt="Preview"
              style={{ maxWidth: "150px", marginTop: "5px" }}
            />
          )}

          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section className="section accordion-section">
        <h2 onClick={() => toggleAccordion("animals")} className="accordion-header">
          Animaux enregistrés {openAccordion.animals ? "▲" : "▼"}
        </h2>
        {openAccordion.animals && (
          <>
            {/* Search input for animals */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher par le nom d'animal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {filteredAnimals.length === 0 && <p>Aucun animal trouvé.</p>}
            {filteredAnimals.map((a) => (
              <div key={a._id} className="animal-card">
                {editAnimalId === a._id ? (
                  // Edit Form for Animal
                  <div className="edit-animal-form">
                    <label>Nom</label>
                    <input
                      value={editAnimalData.nom}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, nom: e.target.value })
                      }
                    />

                    <label>Espèce</label>
                    <select
                      value={editAnimalData.espece}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, espece: e.target.value })
                      }
                    >
                      <option value="Chien">Chien</option>
                      <option value="Chat">Chat</option>
                    </select>

                    <label>Race</label>
                    <input
                      value={editAnimalData.race}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, race: e.target.value })
                      }
                    />

                    <label>Âge</label>
                    <input
                      type="number"
                      value={editAnimalData.age}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, age: e.target.value })
                      }
                    />

                    <label>Sexe</label>
                    <select
                      value={editAnimalData.sexe}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, sexe: e.target.value })
                      }
                    >
                      <option value="Mâle">Mâle</option>
                      <option value="Femelle">Femelle</option>
                      <option value="Inconnu">Inconnu</option>
                    </select>

                    <label>Taille</label>
                    <select
                      value={editAnimalData.taille}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, taille: e.target.value })
                      }
                    >
                      <option value="petit">Petit</option>
                      <option value="moyen">Moyen</option>
                      <option value="grand">Grand</option>
                    </select>

                    {/* NOUVEAU CHAMP EDIT : Sauvetage (isRescue) */}
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="isRescueEdit"
                        checked={editAnimalData.isRescue}
                        onChange={(e) =>
                          setEditAnimalData({ ...editAnimalData, isRescue: e.target.checked })
                        }
                      />
                      <label htmlFor="isRescueEdit">Est un sauvetage ?</label>
                    </div>

                    {/* CHAMPS DE MODIFICATION ACCORDION : COMPORTEMENT ET ENTENTE AVEC */}
                    <h3
                      onClick={() => toggleAccordion("editAnimalComportement")}
                      className="accordion-header"
                    >
                      Comportement(s) {openAccordion.editAnimalComportement ? "▲" : "▼"}
                    </h3>
                    {openAccordion.editAnimalComportement && (
                      <div className="accordion-content checkbox-options">
                        <p>Sélectionner un ou plusieurs comportements</p>
                        {comportementOptions.map((option) => (
                          <div key={`edit-comportement-${option}`}>
                            <input
                              type="checkbox"
                              id={`edit-comportement-${option}`}
                              value={option}
                              checked={editAnimalData.comportement.includes(option)}
                              onChange={(e) =>
                                handleCheckboxChange(e, "comportement", editAnimalData, setEditAnimalData)
                              }
                            />
                            <label htmlFor={`edit-comportement-${option}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    <h3
                      onClick={() => toggleAccordion("editAnimalEntente")}
                      className="accordion-header"
                    >
                      Entente(s) avec {openAccordion.editAnimalEntente ? "▲" : "▼"}
                    </h3>
                    {openAccordion.editAnimalEntente && (
                      <div className="accordion-content checkbox-options">
                        <p>Sélectionner un ou plusieurs types d'entente</p>
                        {ententeAvecOptions.map((option) => (
                          <div key={`edit-entente-${option}`}>
                            <input
                              type="checkbox"
                              id={`edit-entente-${option}`}
                              value={option}
                              checked={editAnimalData.ententeAvec.includes(option)}
                              onChange={(e) =>
                                handleCheckboxChange(e, "ententeAvec", editAnimalData, setEditAnimalData)
                              }
                            />
                            <label htmlFor={`edit-entente-${option}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* FIN CHAMPS DE MODIFICATION ACCORDION */}

                    <label>Description</label>
                    <textarea
                      value={editAnimalData.description}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, description: e.target.value })
                      }
                    />

                    <label>Description Adoption</label>
                    <textarea
                      value={editAnimalData.descriptionAdoption}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, descriptionAdoption: e.target.value })
                      }
                    />

                    <label htmlFor="editAnimalDateArrivee">Date d'arrivée</label>
                    <input
                      id="editAnimalDateArrivee" // Added ID for specific styling
                      type="date"
                      value={editAnimalData.dateArrivee}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, dateArrivee: e.target.value })
                      }
                      className="date-input" // Added class for styling
                    />

                    {/* Image modification fields */}
                    <div className="image-edit-section">
                      <h4>Modifier les images :</h4>
                      <div className="file-input-wrapper">
                        <label htmlFor="editImage1" className="file-input-label">
                          Image 1
                        </label>
                        <input
                          id="editImage1"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "image", setEditAnimalData)}
                          className="hidden-file-input"
                        />
                        {editAnimalData.image && (
                          <span className="file-name">{getFileName(editAnimalData.image)}</span>
                        )}
                      </div>
                      {editAnimalData.image && (
                        <img
                          src={editAnimalData.image}
                          alt="Preview 1"
                          className="image-preview-edit"
                        />
                      )}
                      <button
                        type="button"
                        className="btn_clear_image"
                        onClick={() => setEditAnimalData((prev) => ({ ...prev, image: "" }))}
                      >
                        Supprimer Image 1
                      </button>

                      <div className="file-input-wrapper">
                        <label htmlFor="editImage2" className="file-input-label">
                          Image 2
                        </label>
                        <input
                          id="editImage2"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "image2", setEditAnimalData)}
                          className="hidden-file-input"
                        />
                        {editAnimalData.image2 && (
                          <span className="file-name">{getFileName(editAnimalData.image2)}</span>
                        )}
                      </div>
                      {editAnimalData.image2 && (
                        <img
                          src={editAnimalData.image2}
                          alt="Preview 2"
                          className="image-preview-edit"
                        />
                      )}
                      <button
                        type="button"
                        className="btn_clear_image"
                        onClick={() => setEditAnimalData((prev) => ({ ...prev, image2: "" }))}
                      >
                        Supprimer Image 2
                      </button>

                      <div className="file-input-wrapper">
                        <label htmlFor="editImage3" className="file-input-label">
                          Image 3
                        </label>
                        <input
                          id="editImage3"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "image3", setEditAnimalData)}
                          className="hidden-file-input"
                        />
                        {editAnimalData.image3 && (
                          <span className="file-name">{getFileName(editAnimalData.image3)}</span>
                        )}
                      </div>
                      {editAnimalData.image3 && (
                        <img
                          src={editAnimalData.image3}
                          alt="Preview 3"
                          className="image-preview-edit"
                        />
                      )}
                      <button
                        type="button"
                        className="btn_clear_image"
                        onClick={() => setEditAnimalData((prev) => ({ ...prev, image3: "" }))}
                      >
                        Supprimer Image 3
                      </button>
                    </div> {/* End image-edit-section */}

                    <div className="buttons">
                      <button onClick={() => handleSaveEditAnimal(a._id)} className="btn_save">
                        Sauvegarder
                      </button>
                      <button onClick={handleCancelEdit} className="btn_cancel">
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode for Animal
                  <div className="animal-display-info">
                    <h3>{a.nom}</h3>
                    <p>
                      <span className="info-label">Espèce :</span> {a.espece}
                    </p>
                    <p>
                      <span className="info-label">Race :</span> {a.race}
                    </p>
                    <p>
                      <span className="info-label">Âge :</span> {a.age} ans
                    </p>
                    <p>
                      <span className="info-label">Sexe :</span> {a.sexe}
                    </p>
                    <p>
                      <span className="info-label">Taille :</span> {a.taille}
                    </p>
                    {/* Affichage des nouveaux champs */}
                    <p>
                      <span className="info-label">Comportement(s) :</span>{" "}
                      {a.comportement && a.comportement.length > 0
                        ? a.comportement.join(", ")
                        : "Non spécifié"}
                    </p>
                    <p>
                      <span className="info-label">Entente(s) avec :</span>{" "}
                      {a.ententeAvec && a.ententeAvec.length > 0
                        ? a.ententeAvec.join(", ")
                        : "Non spécifié"}
                    </p>
                    {/* NOUVEAU : Affichage du statut de sauvetage (isRescue) */}
                    <p>
                      <span className="info-label">Sauvetage :</span>{" "}
                      {a.isRescue ? (
                        <span className="tag-rescue">Oui</span>
                      ) : (
                        <span className="tag-not-rescue">Non</span>
                      )}
                    </p>
                    {/* Fin affichage nouveaux champs */}
                    <p>
                      <span className="info-label">Statut :</span>{" "}
                      <span className={`status-${a.adopte ? "adopted" : "available"}`}>
                        {a.adopte ? "Adopté" : "Disponible"}
                      </span>
                    </p>
                    <p>
                      <span className="info-label">Date d'arrivée :</span>{" "}
                      {a.dateArrivee
                        ? new Date(a.dateArrivee).toLocaleDateString("fr-FR")
                        : "-"}
                    </p>
                    <div className="description-section">
                      <span className="info-label">Description :</span>
                      <textarea
                        value={a.description || ""}
                        onChange={(e) => handleUpdateDescription(a._id, e.target.value)}
                        placeholder="Ajouter une description..."
                      />
                    </div>
                    <div className="description-section">
                      <span className="info-label">Description Adoption :</span>
                      <textarea
                        value={a.descriptionAdoption || ""}
                        onChange={(e) => handleUpdateDescriptionAdoption(a._id, e.target.value)}
                        placeholder="Ajouter une description d'adoption..."
                      />
                    </div>

                    <div className="image-display-section">
                      {a.images && a.images.length > 0 && (
                        <>
                          <h4>Images :</h4>
                          <div className="image-previews">
                            {a.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Animal ${a.nom} - ${index + 1}`}
                                className="animal-image-preview"
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="buttons">
                      <button
                        onClick={() => handleToggleAdoption(a._id, a.adopte)}
                        className={`btn_toggle_adoption ${a.adopte ? "btn_available" : "btn_adopted"
                          }`}
                      >
                        Marquer comme {a.adopte ? "Disponible" : "Adopté"}
                      </button>
                      <button
                        onClick={() => handleEditAnimal(a)}
                        className="btn_edit"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => confirmDeleteAnimal(a._id)}
                        className="btn_delete"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </section>

      {/* Accordion for Users */}
      <section className="section accordion-section">
        <h2 onClick={() => toggleAccordion("users")} className="accordion-header">
          Utilisateurs enregistrés {openAccordion.users ? "▲" : "▼"}
        </h2>
        {openAccordion.users && (
          <div className="accordion-content">
            {users.length === 0 && <p>Aucun utilisateur trouvé.</p>}
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.email}</h3>
                <p>
                  <span className="info-label">Rôle :</span> {user.role}
                </p>
                <button
                  onClick={() => confirmDeleteUser(user._id)}
                  className="btn_delete"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Accordion for Comments */}
      <section className="section accordion-section">
        <h2 onClick={() => toggleAccordion("comments")} className="accordion-header">
          Commentaires {openAccordion.comments ? "▲" : "▼"}
        </h2>
        {openAccordion.comments && (
          <div className="accordion-content">
            {comments.length === 0 && <p>Aucun commentaire trouvé.</p>}
            {comments.map((comment) => (
              <div key={comment._id} className="comment-card">
                <p>
                  <span className="info-label">De :</span> {comment.nom}
                </p>
                <p>
                  <span className="info-label">Email :</span> {comment.email}
                </p>
                <p>
                  <span className="info-label">Message :</span>{" "}
                  {comment.message}
                </p>
                <p>
                  <span className="info-label">Reçu le :</span>{" "}
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                </p>
                <button
                  onClick={() => confirmDeleteComment(comment._id)}
                  className="btn_delete"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Back_office;