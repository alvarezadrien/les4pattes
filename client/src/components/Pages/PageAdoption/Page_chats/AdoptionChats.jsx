import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Widgets/Pagination/Pagination";
import Filtres from "../../../Widgets/Filtres/Filtre";
import Loading from "../../../Widgets/Loading/Loading";
import Quiz from "../../../Widgets/Quiz/Quiz.jsx";
import "../Page_chiens/AdoptionChiens.css";

function AdoptionChats() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 12;

  const [sexeFilter, setSexeFilter] = useState("");
  const [tailleFilter, setTailleFilter] = useState("");
  const [dureeRefugeFilter, setDureeRefugeFilter] = useState("");
  const [comportementFilter, setComportementFilter] = useState("");
  const [ententeFilter, setEntenteFilter] = useState("");

  useEffect(() => {
    const fetchCats = async () => {
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
        setCats(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [
    sexeFilter,
    tailleFilter,
    dureeRefugeFilter,
    comportementFilter,
    ententeFilter,
  ]);

  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = cats.slice(indexOfFirstCat, indexOfLastCat);
  const totalPages = Math.ceil(cats.length / catsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getAnimalImage = (cat) => {
    let imgPath = "";

    if (cat.images?.length > 0) imgPath = cat.images[0];
    else if (cat.image) imgPath = cat.image;
    else if (cat.image2) imgPath = cat.image2;
    else if (cat.image3) imgPath = cat.image3;

    if (!imgPath) return null;

    // Si c’est déjà une URL complète (Cloudinary)
    if (imgPath.startsWith("http")) return imgPath;

    // Sinon, c’est un chemin local → on préfixe avec l’API
    const base = process.env.REACT_APP_API_URL.replace(/\/+$/, "");
    return `${base}/${imgPath.replace(/^\/+/, "")}`;
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
            href="#adoption-cat-cards-section"
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
              id="adoption-cat-cards-section"
              className="adoption-dog-grid"
            >
              {currentCats.map((cat) => {
                const imageUrl = getAnimalImage(cat);
                if (!imageUrl) return null;

                return (
                  <div
                    key={cat._id}
                    className="adoption-card"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <div className="adoption-card-name">{cat.nom}</div>
                    {cat.isRescue && (
                      <div className="rescue-tag">Sauvetage</div>
                    )}
                    <div className="adoption-card-content">
                      <h2>{cat.nom}</h2>
                      <p>Âge : {cat.age} ans</p>
                      <p>Sexe : {cat.sexe}</p>
                      <p>Race : {cat.race || "Non spécifiée"}</p>
                      <button
                        onClick={() =>
                          navigate(`/Ficheperso_animal/${cat._id}`)
                        }
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                );
              })}
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
      <Quiz />
    </div>
  );
}

export default AdoptionChats;
