import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filtres from "../../../Widgets/Filtres/Filtre";
import Loading from "../../../Widgets/Loading/Loading"; // ← vérifie le chemin

const ITEMS_PER_PAGE = 12;

const Fichegalerie = () => {
  const navigate = useNavigate();

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [sexeFilter, setSexeFilter] = useState("");
  const [tailleFilter, setTailleFilter] = useState("");
  const [dureeRefugeFilter, setDureeRefugeFilter] = useState("");
  const [comportementFilter, setComportementFilter] = useState("");
  const [ententeFilter, setEntenteFilter] = useState("");

  const fetchCats = () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append("espece", "Chat");
    params.append("adopte", "false");

    if (sexeFilter) params.append("sexe", sexeFilter);
    if (tailleFilter) params.append("taille", tailleFilter);
    if (dureeRefugeFilter) params.append("dureeRefuge", dureeRefugeFilter);
    if (comportementFilter) params.append("comportement", comportementFilter);
    if (ententeFilter) params.append("ententeAvec", ententeFilter);

    fetch(`${process.env.REACT_APP_API_URL}/api/animaux?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCats(data);
        setCurrentPage(1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCats();
  }, [sexeFilter, tailleFilter, dureeRefugeFilter, comportementFilter, ententeFilter]);

  // ===> 🔁 Pendant chargement, ne montre rien d'autre
  if (loading) return <Loading />;
  if (error) return <p>Erreur : {error}</p>;

  const totalPages = Math.ceil(cats.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCats = cats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-container">
      <Filtres
        sexe={sexeFilter}
        setSexe={setSexeFilter}
        taille={tailleFilter}
        setTaille={setTailleFilter}
        dureeRefuge={dureeRefugeFilter}
        setDureeRefuge={setDureeRefugeFilter}
        comportement={comportementFilter}
        setComportement={setComportementFilter}
        entente={ententeFilter}
        setEntente={setEntenteFilter}
        disableTaille={true}
      />

      <section className="container_appercu">
        <div className="animal_group_chat">
          {currentCats.length > 0 ? (
            currentCats.map((cat, index) => (
              <div className="item" key={`cat-${startIndex + index}`}>
                <img
                  src={
                    cat.image
                      ? `${process.env.REACT_APP_API_URL}${cat.image}`
                      : "/img/default.jpg"
                  }
                  alt={`Photo de ${cat.nom}`}
                />
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
            ))
          ) : (
            <p>Aucun chat ne correspond à vos critères de recherche.</p>
          )}
        </div>
      </section>

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
