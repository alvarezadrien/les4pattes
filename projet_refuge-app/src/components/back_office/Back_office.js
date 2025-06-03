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
    name: "",
    type: "chien",
    race: "",
    age: "",
    sexe: "mâle",
    taille: "moyen",
    description: "",
    descriptionAdoption: "",
    dateArrivee: "",
    image: "",
    image2: "",
    image3: "",
    images: [],
  });

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
    if (!newAnimal.name || !newAnimal.type || !newAnimal.age) return;

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
          name: "",
          type: "chien",
          race: "",
          age: "",
          sexe: "mâle",
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

  const handleDeleteAnimal = (id) => {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => setAnimals(animals.filter((a) => a._id !== id)))
      .catch((err) => console.error("Erreur suppression animal:", err));
  };

  // Ici, on gère le toggle d'adoption : si adopté, on peut annuler et vice-versa
  const handleToggleAdoption = (id, currentStatus) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adopted: !currentStatus }),
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

  const handleDeleteUser = (id) => {
    fetch(`${usersApiUrl}/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((u) => u._id !== id)))
      .catch((err) => console.error("Erreur suppression utilisateur:", err));
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className="back-office">
      <h1 className="h1_office">Back Office - Gestion du Refuge</h1>

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
            value={newAnimal.name}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, name: e.target.value })
            }
          />

          <label>Type</label>
          <select
            value={newAnimal.type}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, type: e.target.value })
            }
          >
            <option value="chien">Chien</option>
            <option value="chat">Chat</option>
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
            <option value="mâle">Mâle</option>
            <option value="femelle">Femelle</option>
            <option value="inconnu">Inconnu</option>
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
            value={newAnimal.image}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, image: e.target.value })
            }
          />
          <label>Image 2</label>
          <input
            value={newAnimal.image2}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, image2: e.target.value })
            }
          />
          <label>Image 3</label>
          <input
            value={newAnimal.image3}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, image3: e.target.value })
            }
          />

          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section className="section">
        <h2>Animaux enregistrés</h2>
        {animals.length === 0 && <p>Aucun animal enregistré.</p>}
        {animals.map((a) => (
          <div key={a._id} className="animal-card">
            <strong>{a.nom || a.name}</strong> ({a.type})<br />
            Race : {a.race} <br />
            Âge : {a.age} ans - Sexe : {a.sexe} - Taille : {a.taille} <br />
            Statut : {a.adopted ? "Adopté" : "Disponible"}
            <br />
            <label>Description</label>
            <textarea
              value={a.description || ""}
              onChange={(e) => handleUpdateDescription(a._id, e.target.value)}
              placeholder="Ajouter une description"
            />
            <label>Description Adoption</label>
            <p>{a.descriptionAdoption || "-"}</p>
            <label>Date d'arrivée</label>
            <p>
              {a.dateArrivee
                ? new Date(a.dateArrivee).toLocaleDateString()
                : "-"}
            </p>
            <div className="buttons">
              <button
                onClick={() => handleToggleAdoption(a._id, a.adopted)}
              >
                {a.adopted ? "Annuler adoption" : "Marquer comme adopté"}
              </button>
              <button onClick={() => handleDeleteAnimal(a._id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Utilisateurs</h2>
        {users.length === 0 && <p>Aucun utilisateur.</p>}
        {users.map((u) => (
          <div key={u._id} className="user-card">
            {u.email}{" "}
            <button onClick={() => handleDeleteUser(u._id)}>Supprimer</button>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Commentaires</h2>
        {comments.length === 0 && <p>Aucun commentaire.</p>}
        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            "{c.text}"{" "}
            <button onClick={() => handleDeleteComment(c.id)}>Supprimer</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Back_office;
