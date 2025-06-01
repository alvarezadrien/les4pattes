import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Fiche_galeriechien = () => {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/animaux")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Filtrer uniquement les animaux dont espece === "chien"
                const chiens = data.filter(animals => animals.espece === "Chien");
                setDogs(chiens);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement des chiens...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="page-container">
            <section className="container_appercu">
                <div className="animal_group_chien">
                    {dogs.map((dog, index) => (
                        <div className="item" key={`dog-${index}`}>
                            <img src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                            <div className="item_info">
                                <h3>{dog.name}</h3>
                                <p className="age">Âge: {dog.age}</p>
                                <span>Race: {dog.espece}</span> <br />
                                <span>Sexe: {dog.sexe}</span> <br />
                                <button
                                    type="button"
                                    onClick={() => navigate(`/Ficheperso_animal`)}
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Fiche_galeriechien;
