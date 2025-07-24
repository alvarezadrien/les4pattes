import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Compagnons_adopter.css";
import Loading from "../../Widgets/Loading/Loading.jsx";

const Compagnons_adopter = () => {
    const [animaux, setAnimaux] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimaux = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}/api/animaux?adopte=true`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();
                const animauxArray = Array.isArray(data) ? data : data.animaux || [];
                setAnimaux(animauxArray);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimaux();
    }, []);

    const getAnimalImage = (animal) => {
        const base = process.env.REACT_APP_API_URL.replace(/\/+$/, "");

        let imgPath = "";
        if (animal.images?.length > 0) imgPath = animal.images[0];
        else if (animal.image) imgPath = animal.image;
        else if (animal.image2) imgPath = animal.image2;
        else if (animal.image3) imgPath = animal.image3;

        return imgPath ? `${base}/${imgPath.replace(/^\/+/, "")}` : null;
    };

    if (loading) return <Loading />;
    if (error) return <p className="error-message">Erreur : {error}</p>;
    if (!animaux.length) return <p className="no-compagnon-message">Aucun compagnon adopté pour l’instant. Revenez vite !</p>;

    return (
        <div className="page_compagnons">
            <header className="compagnons_header">
                <h1 className="h1_compagnons">
                    <img src="/img/pattes.png" alt="pattes" className="pattes-icon" />
                    Nos compagnons <span className="highlight-text">adoptés</span>
                    <img src="/img/pattes.png" alt="pattes" className="pattes-icon" />
                </h1>
                <p className="paragraphe_compagnons">
                    Chaque adoption est une magnifique histoire ! Découvrez les animaux qui ont trouvé leur foyer pour la vie. Merci à toutes les familles qui ont ouvert leur cœur et offert une seconde chance à nos amis à quatre pattes.
                </p>
            </header>

            <section className="container_compagnons">
                <div className="animal_group_compagnons">
                    {animaux
                        .map((animal) => {
                            const imageUrl = getAnimalImage(animal);
                            if (!imageUrl) return null;

                            return (
                                <div
                                    key={animal._id}
                                    className="adoption-card"
                                    style={{
                                        backgroundImage: `url(${imageUrl})`,
                                    }}
                                >
                                    <div className="adoption-card-name">{animal.nom}</div>
                                    <div className="adoption-card-content">
                                        <h2>{animal.nom}</h2>
                                        {animal.descriptionAdoption && animal.descriptionAdoption.trim() !== "" ? (
                                            <p>{animal.descriptionAdoption}</p>
                                        ) : (
                                            <p>
                                                Ce merveilleux compagnon a trouvé une famille aimante pour la vie ! <br /> Nous lui souhaitons beaucoup de bonheur. ♥
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
};

export default Compagnons_adopter;
