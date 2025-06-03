import React, { useState, useEffect } from "react";
import "./Back_office.css";

function Back_office() {
  const [animals, setAnimals] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([
    { id: 1, text: "Très bon refuge !" },
    { id: 2, text: "Adoption facile." },
  ]);
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
    image: "",
    image2: "",
    image3: "",
    images: [],
  });

  const [openAccordion, setOpenAccordion] = useState({
    animals: true,
    users: false,
    comments: false,
  });

  // États pour la pop-up de confirmation
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupAction, setPopupAction] = useState(null); // Fonction à exécuter si confirmé

  const apiUrl = "http://localhost:5000/api/animaux";
  const usersApiUrl = "http://localhost:5000/api/auth/users";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error("Erreur chargement animaux:", err));

    fetch(usersApiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur chargement utilisateurs:", err));
  }, []);

  const handleAddAnimal = () => {
    if (!newAnimal.nom || !newAnimal.espece || !newAnimal.age) return;

    const animalToSend = {
      ...newAnimal,
      images: [newAnimal.image, newAnimal.image2, newAnimal.image3].filter(Boolean),
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
        });
      })
      .catch((err) => console.error("Erreur ajout animal:", err));
  };

  // Fonctions de suppression avec confirmation
  const confirmDeleteAnimal = (id) => {
    setPopupMessage("Voulez-vous vraiment supprimer cet animal ?");
    setPopupAction(() => () => { // Utilisation d'une fonction pour définir l'action
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

  const confirmDeleteComment = (id) => {
    setPopupMessage("Voulez-vous vraiment supprimer ce commentaire ?");
    setPopupAction(() => () => {
      setComments(comments.filter((c) => c.id !== id));
      setShowPopup(false);
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
        setAnimals(
          animals.map((a) => (a._id === id ? updatedAnimal : a))
        );
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

  const toggleAccordion = (section) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewAnimal((prev) => ({ ...prev, [field]: imageUrl }));
    }
  };

  const [editAnimalId, setEditAnimalId] = useState(null);
  const [editAnimalData, setEditAnimalData] = useState({});

  const handleEditAnimal = (animal) => {
    setEditAnimalId(animal._id);
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
    });
  };

  const handleCancelEdit = () => {
    setEditAnimalId(null);
    setEditAnimalData({});
  };

  const handleSaveEditAnimal = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAnimalData),
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

  return (
    <div className="back-office">
      <h1 className="h1_office">Back Office - Gestion du Refuge</h1>

      {/* Pop-up de confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <div className="popup-buttons">
              <button onClick={handlePopupConfirm} className="btn_confirm">Confirmer</button>
              <button onClick={handlePopupCancel} className="btn_cancel">Annuler</button>
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

          <label>Date d'arrivée</label>
          <input
            type="date"
            value={newAnimal.dateArrivee}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, dateArrivee: e.target.value })
            }
          />

          <label>Image 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "image")}
          />
          {newAnimal.image && (
            <img src={newAnimal.image} alt="Preview" style={{ maxWidth: "150px", marginTop: "5px" }} />
          )}

          <label>Image 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "image2")}
          />
          {newAnimal.image2 && (
            <img src={newAnimal.image2} alt="Preview" style={{ maxWidth: "150px", marginTop: "5px" }} />
          )}

          <label>Image 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "image3")}
          />
          {newAnimal.image3 && (
            <img src={newAnimal.image3} alt="Preview" style={{ maxWidth: "150px", marginTop: "5px" }} />
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
            {animals.length === 0 && <p>Aucun animal enregistré.</p>}
            {animals.map((a) => (
              <div key={a._id} className="animal-card">
                {editAnimalId === a._id ? (
                  <>
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

                    <label>Date d'arrivée</label>
                    <input
                      type="date"
                      value={editAnimalData.dateArrivee}
                      onChange={(e) =>
                        setEditAnimalData({ ...editAnimalData, dateArrivee: e.target.value })
                      }
                    />

                    <div className="buttons">
                      <button onClick={() => handleSaveEditAnimal(a._id)} className="btn_save">
                        Sauvegarder
                      </button>
                      <button onClick={handleCancelEdit} className="btn_cancel">
                        Annuler
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>{a.nom}</strong><br />
                    Race : {a.race} <br />
                    Âge : {a.age} ans - Sexe : {a.sexe} - Taille : {a.taille} <br />
                    Statut : {a.adopte ? "Adopté" : "Disponible"}
                    <br />
                    <label>Date d'arrivée</label>
                    <p>
                      {a.dateArrivee
                        ? new Date(a.dateArrivee).toLocaleDateString()
                        : "-"}
                    </p>
                    <br />
                    <label>Description</label>
                    <textarea
                      value={a.description || ""}
                      onChange={(e) => handleUpdateDescription(a._id, e.target.value)}
                    />

                    <div className="buttons">
                      <button
                        onClick={() => handleToggleAdoption(a._id, a.adopte)}
                        className="btn_adopt"
                      >
                        {a.adopte ? "Annuler adoption" : "Marquer comme adopté"}
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
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </section>

      <section className="section accordion-section">
        <h2 onClick={() => toggleAccordion("users")} className="accordion-header">
          Utilisateurs enregistrés {openAccordion.users ? "▲" : "▼"}
        </h2>
        {openAccordion.users && (
          <>
            {users.length === 0 && <p>Aucun utilisateur enregistré.</p>}
            {users.map((u) => (
              <div key={u._id} className="user-card">
                <strong>{u.username}</strong> ({u.email})
                <button onClick={() => confirmDeleteUser(u._id)} className="btn_delete"> {/* Appel de la fonction de confirmation */}
                  Supprimer
                </button>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="section accordion-section">
        <h2 onClick={() => toggleAccordion("comments")} className="accordion-header">
          Commentaires {openAccordion.comments ? "▲" : "▼"}
        </h2>
        {openAccordion.comments && (
          <>
            {comments.length === 0 && <p>Aucun commentaire.</p>}
            {comments.map((c) => (
              <div key={c.id} className="comment-card">
                <p>{c.text}</p>
                <button onClick={() => confirmDeleteComment(c.id)} className="btn_delete"> {/* Appel de la fonction de confirmation */}
                  Supprimer
                </button>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}

export default Back_office;