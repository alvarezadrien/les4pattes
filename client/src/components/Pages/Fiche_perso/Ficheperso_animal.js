import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Ficheperso_animal.css";
import Carte_carrousel from "../../Widgets/Carrousel/Carte_carrousel";
import Loading from "../../Widgets/Loading/Loading";

const Ficheperso_animal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/animaux/${id}`);
        if (!response.ok) throw new Error("Animal non trouvé");
        const data = await response.json();

        const baseUrl = process.env.REACT_APP_API_URL.replace(/\/+$/, "");
        const images = [];

        if (data.images && data.images.length > 0) {
          data.images.forEach((imgPath) => {
            if (imgPath) images.push(`${baseUrl}/${imgPath.replace(/^\/+/, "")}`);
          });
        } else {
          if (data.image) images.push(`${baseUrl}/${data.image.replace(/^\/+/, "")}`);
          if (data.image2) images.push(`${baseUrl}/${data.image2.replace(/^\/+/, "")}`);
          if (data.image3) images.push(`${baseUrl}/${data.image3.replace(/^\/+/, "")}`);
        }

        setAnimal({ ...data, _processedImages: images });
        setMainImg(images[0] || `${baseUrl}/img/default.jpg`);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) return <Loading />;

  if (error || !animal) {
    return (
      <div className="animal-details-container">
        <p>{error || "Aucun animal sélectionné."}</p>
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
    );
  }

  const thumbnails = animal._processedImages?.slice(0, 3) || [];
  const handleImageClick = (img) => setMainImg(img);
  const handleAdoptClick = () => {
    navigate("/Formulaire d'adoption", { state: { animalData: animal } });
  };

  const defaultImg = `${process.env.REACT_APP_API_URL.replace(/\/+$/, "")}/img/default.jpg`;

  return (
    <div>
      <div className="animal-details-container">
        <div className="image-section">
          <img
            className="main-image"
            src={mainImg}
            alt={`Photo de ${animal.nom}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <div className="small-images">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                className={`small-image${img === mainImg ? " selected" : ""}`}
                src={img}
                alt={`Miniature ${idx + 1}`}
                onClick={() => handleImageClick(img)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
              />
            ))}
            {Array.from({ length: Math.max(0, 3 - thumbnails.length) }).map((_, idx) => (
              <div key={`empty-${idx}`} className="small-image empty-thumbnail" />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>{animal.nom}</h2>
          {animal.isRescue && <div className="rescue-tag-fiche">Sauvetage</div>}

          <div className="div_p_infos">
            <p><strong>Espèce :</strong> {animal.espece || "N/A"}</p>
            <p><strong>Race :</strong> {animal.race || "N/A"}</p>
            <p><strong>Âge :</strong> {animal.age ?? "N/A"}</p>
            <p><strong>Sexe :</strong> {animal.sexe || "N/A"}</p>
            <p><strong>Taille :</strong> {animal.taille || "N/A"}</p>
          </div>

          <br />
          <p className="arrival_date">
            <strong>Date d'arrivée :</strong> {animal.dateArrivee ? new Date(animal.dateArrivee).toLocaleDateString() : "N/A"}
          </p>
          <p><strong>Adopté :</strong> {animal.adopte ? "Oui" : "Non"}</p>

          <br />
          {animal.description && (
            <>
              <h3>Description :</h3>
              <p className="paragraphe_description_infos">{animal.description}</p>
            </>
          )}

          {animal.comportement?.length > 0 && (
            <>
              <h3>Comportement :</h3>
              <p>{animal.comportement.join(", ")}</p>
            </>
          )}

          {animal.ententeAvec?.length > 0 && (
            <>
              <h3>Entente avec :</h3>
              <p>{animal.ententeAvec.join(", ")}</p>
            </>
          )}

          {!animal.adopte && (
            <button className="adopt-button" onClick={handleAdoptClick}>
              Adopter ce loulou
            </button>
          )}
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
