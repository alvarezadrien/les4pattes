import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filtres from "../../../Widgets/Filtres/Filtre";

const ITEMS_PER_PAGE = 12;

const Fichegalerie = () => {
  const navigate = useNavigate();

  // États des données & UI
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // États des filtres (sexe, taille)
  const [sexeFilter, setSexeFilter] = useState("");
  const [tailleFilter, setTailleFilter] = useState("");

  // Fonction pour fetch les chats filtrés depuis l'API
  const fetchCats = () => {
    setLoading(true);
    setError(null);

    // Construire les query params selon filtres
    const params = new URLSearchParams();
    params.append("espece", "Chat"); // On veut que les chats

    if (sexeFilter) params.append("sexe", sexeFilter);
    if (tailleFilter) params.append("taille", tailleFilter);

    fetch(`http://localhost:5000/api/animaux?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCats(data);
        setLoading(false);
        setCurrentPage(1); // Reset page quand filtre change
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch au chargement et à chaque changement de filtres
  useEffect(() => {
    fetchCats();
  }, [sexeFilter, tailleFilter]);

  if (loading) return <p>Chargement des chats...</p>;
  if (error) return <p>Erreur : {error}</p>;

  // Pagination
  const totalPages = Math.ceil(cats.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCats = cats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-container">
      {/* Composant Filtres, on passe les états et setters */}
      <Filtres
        sexe={sexeFilter}
        setSexe={setSexeFilter}
        taille={tailleFilter}
        setTaille={setTailleFilter}
      />

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
                  onClick={() => navigate(`/Ficheperso_animal/${cat._id}`)}
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
