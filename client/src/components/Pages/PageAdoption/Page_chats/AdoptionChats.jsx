import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Page_chiens/AdoptionChiens.css";
import Pagination from "../../../Widgets/Pagination/Pagination";
import Filtres from "../../../Widgets/Filtres/Filtre";
import Loading from "../../../Widgets/Loading/Loading";

function AdoptionChats() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 12;

  const [sexeFilter, setSexeFilter] = useState("");
  const [tailleFilter, setTailleFilter] = useState("");
  const [dureeRefugeFilter, setDureeRefugeFilter] = useState("");
  const [comportementFilter, setComportementFilter] = useState("");
  const [ententeFilter, setEntenteFilter] = useState("");

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("espece", "Chat");
        params.append("adopte", "false");

        if (sexeFilter) params.append("sexe", sexeFilter);
        if (tailleFilter) params.append("taille", tailleFilter);
        if (comportementFilter)
          params.append("comportement", comportementFilter);
        if (ententeFilter) params.append("ententeAvec", ententeFilter);
        if (dureeRefugeFilter) params.append("dureeRefuge", dureeRefugeFilter);

        const baseUrl = process.env.REACT_APP_API_URL.replace(/\/+$/, "");
        const res = await fetch(`${baseUrl}/api/animaux?${params.toString()}`);
        const data = await res.json();
        setDogs(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
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

  const getAnimalImage = (dog) => {
    const base = process.env.REACT_APP_API_URL.replace(/\/+$/, "");

    let imgPath = "";
    if (dog.images?.length > 0) imgPath = dog.images[0];
    else if (dog.image) imgPath = dog.image;
    else if (dog.image2) imgPath = dog.image2;
    else if (dog.image3) imgPath = dog.image3;

    if (imgPath) return `${base}/${imgPath.replace(/^\/+/, "")}`;
    return "/img/default.jpg";
  };

  return (
    <div className="adoption-chiens-page">
      <header className="adoption-hero-container cat-hero">
        <div className="adoption-hero-content">
          <h1 className="adoption-hero-title-textured">
            Trouvez Votre Nouveau Compagnon Félin !
          </h1>
          <p>Découvrez nos adorables chats prêts à trouver un foyer aimant.</p>
          <a
            href="#adoption-dog-cards-section"
            className="adoption-btn-discover"
          >
            Découvrir les chats
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

        {loading ? (
          <Loading />
        ) : (
          <>
            <section
              id="adoption-dog-cards-section"
              className="adoption-dog-grid"
            >
              {currentDogs.map((dog) => (
                <div
                  key={dog._id}
                  className="adoption-card"
                  style={{
                    backgroundImage: `url(${getAnimalImage(dog)})`,
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
          </>
        )}
      </main>
    </div>
  );
}

export default AdoptionChats;
