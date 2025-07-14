import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdoptionChiens.css";
import Pagination from "../../../Widgets/Pagination/Pagination";
import Filtres from "../../../Widgets/Filtres/Filtre";

function AdoptionChiens() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 12;

  const [sexeFilter, setSexeFilter] = useState("");
  const [tailleFilter, setTailleFilter] = useState("");
  const [dureeRefugeFilter, setDureeRefugeFilter] = useState("");
  const [comportementFilter, setComportementFilter] = useState("");
  const [ententeFilter, setEntenteFilter] = useState("");

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const params = new URLSearchParams();
        params.append("espece", "Chien");
        params.append("adopte", "false");

        if (sexeFilter) params.append("sexe", sexeFilter);
        if (tailleFilter) params.append("taille", tailleFilter);
        if (comportementFilter)
          params.append("comportement", comportementFilter);
        if (ententeFilter) params.append("ententeAvec", ententeFilter);
        if (dureeRefugeFilter) params.append("dureeRefuge", dureeRefugeFilter);

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/animaux?${params.toString()}`
        );
        const data = await res.json();
        setDogs(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDogs();
  }, [
    sexeFilter,
    tailleFilter,
    dureeRefugeFilter,
    comportementFilter,
    ententeFilter,
  ]);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="adoption-chiens-page">
      <header className="adoption-hero-container">
        <div className="adoption-hero-content">
          <h1 className="adoption-hero-title-textured">
            Trouvez Votre Nouveau Compagnon Canin !
          </h1>
          <p>Découvrez nos adorables chiens prêts à trouver un foyer aimant.</p>
          <a
            href="#adoption-dog-cards-section"
            className="adoption-btn-discover"
          >
            Découvrir les chiens
          </a>
        </div>
      </header>

      <main className="adoption-container">
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
        />

        <section id="adoption-dog-cards-section" className="adoption-dog-grid">
          {currentDogs.map((dog) => (
            <div
              key={dog._id}
              className="adoption-card"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_URL}${
                  dog.images?.[0] || "/img/default.jpg"
                })`,
              }}
            >
              <div className="adoption-card-name">{dog.nom}</div>
              {dog.isRescue && <div className="rescue-tag">Sauvetage</div>}
              <div className="adoption-card-content">
                <h2>{dog.nom}</h2>
                <p>Âge : {dog.age} ans</p>
                <p>Sexe : {dog.sexe}</p>
                <p>Race : {dog.race || "Non spécifiée"}</p>
                <button
                  onClick={() => navigate(`/Ficheperso_animal/${dog._id}`)}
                >
                  Voir
                </button>
              </div>
            </div>
          ))}
        </section>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default AdoptionChiens;
