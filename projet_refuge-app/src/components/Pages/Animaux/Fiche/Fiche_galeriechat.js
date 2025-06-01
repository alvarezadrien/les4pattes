import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Fichegalerie = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(cats.length / ITEMS_PER_PAGE);

  // Calcul des éléments à afficher sur la page courante
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCats = cats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Gestion du clic sur une page
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-container">
      <section className="container_appercu">
        <div className="animal_group_chat">
          {currentCats.map((cat, index) => (
            <div className="item" key={`cat-${startIndex + index}`}>
              <img src={cat.image} alt={`Photo de ${cat.nom}`} />
              <div className="item_info">
                <h3>{cat.nom}</h3>
                <p className="age">Âge: {cat.age}</p>
                <span>Race: {cat.race}</span> <br />
                <span>Sexe: {cat.sexe}</span> <br />
                <button
                  type="button"
                  onClick={() => navigate(`/Ficheperso_animal`)}
                >
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Fichegalerie;
