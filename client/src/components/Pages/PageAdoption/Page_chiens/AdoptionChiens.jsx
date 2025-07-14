import React, { useEffect, useState } from "react";
import "./AdoptionChiens.css";
import Pagination from "../../../Widgets/Pagination/Pagination";

const HeroSection = () => {
  return (
    <header className="adoption-hero-container">
      <div className="adoption-hero-content">
        <h1 className="adoption-hero-title-textured">
          Trouvez Votre Nouveau Compagnon Canin !
        </h1>
        <p>Découvrez nos adorables chiens prêts à trouver un foyer aimant.</p>
        <a href="#adoption-dog-cards-section" className="adoption-btn-discover">
          Découvrir les chiens
        </a>
      </div>
    </header>
  );
};

const DogCard = ({ dog, onAdoptClick }) => {
  const imageUrl =
    dog.image && dog.image !== "" ? dog.image : "https://picsum.photos/280/380";

  return (
    <div
      className="adoption-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="adoption-card-name">{dog.nom}</div>
      <div className="adoption-card-content">
        <h2>Nom : {dog.nom}</h2>
        <p>Âge : {dog.age} ans</p>
        <p>Sexe : {dog.sexe}</p>
        <p>Race : {dog.race || "Non spécifiée"}</p>
        <button onClick={() => onAdoptClick(dog.nom)}>Voir</button>
      </div>
    </div>
  );
};

function AdoptionChiens() {
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 6;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/animaux`);
        const data = await res.json();
        const filteredDogs = data.filter(
          (animal) => animal.espece === "Chien" && !animal.adopte
        );
        setDogs(filteredDogs);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchDogs();
  }, []);

  const handleAdoptClick = (dogName) => {
    alert(
      `Merci pour votre intérêt pour ${dogName} ! Contactez-nous pour adopter.`
    );
  };

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="adoption-chiens-page">
      <HeroSection />
      <main className="adoption-container">
        <section id="adoption-dog-cards-section" className="adoption-dog-grid">
          {currentDogs.map((dog) => (
            <DogCard key={dog._id} dog={dog} onAdoptClick={handleAdoptClick} />
          ))}
        </section>
        {dogs.length > dogsPerPage && (
          <Pagination
            totalItems={dogs.length}
            itemsPerPage={dogsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default AdoptionChiens;
