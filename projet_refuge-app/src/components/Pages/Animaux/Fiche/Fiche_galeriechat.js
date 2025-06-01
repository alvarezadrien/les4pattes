import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Fichegalerie = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/animaux")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filtrer uniquement les chats
        const onlyCats = data.filter((animal) => animal.espece === "Chat");
        setCats(onlyCats);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des chats...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="page-container">
      <section className="container_appercu">
        <div className="animal_group_chat">
          {cats.map((cat, index) => (
            <div className="item" key={`cat-${index}`}>
              <img src={cat.imgSrc} alt={`Photo de ${cat.name}`} />
              <div className="item_info">
                <h3>{cat.nom}</h3>
                <p className="age">Âge: {cat.age}</p>
                <span>Race: {cat.race}</span> <br />
                <span>Sexe: {cat.sexe}</span> <br />
                <button type="button" onClick={() => navigate(`/Ficheperso_animal`)}>
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fichegalerie;
