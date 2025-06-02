import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Ficheperso_animal.css";
import Carte_carrousel from "../../Widgets/Carrousel/Carte_carrousel";

const Ficheperso_animal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/animaux/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Animal non trouvé");
        return res.json();
      })
      .then((data) => {
        setAnimal(data);
        const images = data.images && data.images.length > 0 ? [...data.images] : [];
        const fallbackImg = data.image;

        const thumbnails = images.slice(0, 2);

        if (fallbackImg && !thumbnails.includes(fallbackImg)) {
          thumbnails.push(fallbackImg);
        }

        setMainImg(thumbnails[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement de l'animal...</p>;

  if (error || !animal) {
    return (
      <div className="animal-details-container">
        <p>{error || "Aucun animal sélectionné."}</p>
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
    );
  }

  // Reconstituer les thumbnails comme dans useEffect
  const thumbnails = (() => {
    const images = animal.images && animal.images.length > 0 ? [...animal.images] : [];
    const fallbackImg = animal.image;
    const thumbs = images.slice(0, 2);
    if (fallbackImg && !thumbs.includes(fallbackImg)) {
      thumbs.push(fallbackImg);
    }
    return thumbs;
  })();

  const handleImageClick = (img) => setMainImg(img);

  return (
    <div>
      <div className="animal-details-container">
        <div className="image-section">
          {mainImg ? (
            <img className="main-image" src={mainImg} alt={`Photo de ${animal.nom}`} />
          ) : (
            <p>Aucune image disponible</p>
          )}

          <div className="small-images">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                className={`small-image${img === mainImg ? " selected" : ""}`}
                src={img}
                alt={`Miniature ${idx + 1}`}
                onClick={() => handleImageClick(img)}
                style={{ cursor: "pointer" }}
              />
            ))}
            {/* Si moins de 3 images malgré tout, compléter avec des divs vides */}
            {Array.from({ length: 3 - thumbnails.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className="small-image empty-thumbnail" />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>{animal.nom}</h2>
          <div className="div_p_infos">
            <p><strong>Race :</strong> {animal.race}</p>
            <p><strong>Âge :</strong> {animal.age}</p>
            <p><strong>Taille :</strong> {animal.taille || "N/A"}</p>
          </div>
          <br />
          <p className="arrival_date">
            <strong>Date d'arrivée :</strong> {animal.dateArrivee || "N/A"}
          </p>
          <br />
          <p className="paragraphe_description_infos">{animal.description}</p>
        </div>
      </div>

      <div className="carrousel_vue">
        <h3 className="h3_plus_animaux">
          <img src="/img/pattes.png" alt="" width={40} height={40} />
          Plus d'animaux
          <img src="/img/pattes.png" alt="" width={40} height={40} />
        </h3>
        <Carte_carrousel />
      </div>
    </div>
  );
};

export default Ficheperso_animal;
