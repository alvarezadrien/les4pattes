import React, { useState, useEffect } from "react";
import "./AdoptionChiens.css"; // Imports styles from AdoptionChiens.css

// --- HeroSection Component ---
const HeroSection = () => {
  return (
    <header className="adoption-hero-container">
      <div className="adoption-hero-content">
        {/* Title with image background for text */}
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

// --- DogCard Component ---
const DogCard = ({ dog, onAdoptClick }) => {
  // Uses dog.image for the image URL. If it's empty, it will still use picsum.photos.
  const imageUrl =
    dog.image && dog.image !== "" ? dog.image : "https://picsum.photos/280/380";

  return (
    <div
      className="adoption-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
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

// --- Main AdoptionChiens Component ---
function AdoptionChiens() {
  // By default, we use static dogs for immediate rendering.
  // Uncomment the API section and comment this part to use real data.
  const [dogs, setDogs] = useState([
    {
      _id: "static1",
      nom: "Buddy",
      age: 2,
      sexe: "Mâle",
      race: "Golden Retriever",
      image: "https://picsum.photos/280/380?random=1", // Picsum random image
      espece: "chien",
      adopte: false,
    },
    {
      _id: "static2",
      nom: "Lucy",
      age: 1,
      sexe: "Femelle",
      race: "Labrador",
      image: "https://picsum.photos/280/380?random=2", // Picsum random image
      espece: "chien",
      adopte: false,
    },
    {
      _id: "static3",
      nom: "Max",
      age: 4,
      sexe: "Mâle",
      race: "Berger Allemand",
      image: "https://picsum.photos/280/380?random=3", // Picsum random image
      espece: "chien",
      adopte: false,
    },
    {
      _id: "static4",
      nom: "Bella",
      age: 3,
      sexe: "Femelle",
      race: "Beagle",
      image: "https://picsum.photos/280/380?random=4", // Picsum random image
      espece: "chien",
      adopte: false,
    },
    {
      _id: "static5",
      nom: "Rocky",
      age: 6,
      sexe: "Mâle",
      race: "Bulldog",
      image: "https://picsum.photos/280/380?random=5", // Picsum random image
      espece: "chien",
      adopte: false,
    },
    {
      _id: "static6",
      nom: "Daisy",
      age: 2,
      sexe: "Femelle",
      race: "Caniche",
      image: "https://picsum.photos/280/380?random=6", // Picsum random image
      espece: "chien",
      adopte: false,
    },
  ]);

  // --- API Fetch Logic (uncomment to activate) ---
  /*
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:3001/api/animals';

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        const nonAdoptedDogs = data.filter(animal => animal.espece === 'chien' && !animal.adopte);
        setDogs(nonAdoptedDogs);
      } catch (err) {
        console.error("Error fetching dogs:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) {
    return <div className="adoption-container" style={{ textAlign: 'center', padding: '50px' }}>Loading dogs...</div>;
  }

  if (error) {
    return <div className="adoption-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error loading dogs: {error.message}</div>;
  }
  */
  // --- End API Fetch Logic ---

  const handleAdoptClick = (dogName) => {
    alert(
      `Thank you for your interest in ${dogName}! Please contact us for adoption procedures.`
    );
  };

  if (dogs.length === 0) {
    return (
      <div
        className="adoption-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        No dogs available for adoption at the moment. Check back later!
      </div>
    );
  }

  return (
    <div className="adoption-chiens-page">
      <HeroSection />
      <main className="adoption-container">
        <section id="adoption-dog-cards-section" className="adoption-dog-grid">
          {dogs.map((dog) => (
            <DogCard key={dog._id} dog={dog} onAdoptClick={handleAdoptClick} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdoptionChiens;
