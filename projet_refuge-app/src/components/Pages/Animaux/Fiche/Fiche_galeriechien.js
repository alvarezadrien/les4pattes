import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Fiche_galeriechien = () => {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:5000/api/animaux")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const chiens = data.filter((animal) => animal.espece === "Chien");
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

    // Pagination : calcul nombre total de pages
    const totalPages = Math.ceil(dogs.length / ITEMS_PER_PAGE);

    // Calcul des chiens à afficher sur la page courante
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDogs = dogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Fonction pour changer de page
    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="page-container">
            <section className="container_appercu">
                <div className="animal_group_chien">
                    {currentDogs.map((dog, index) => (
                        <div className="item" key={`dog-${startIndex + index}`}>
                            <img src={dog.image} alt={`Photo de ${dog.name}`} />
                            <div className="item_info">
                                <h3>{dog.nom}</h3>
                                <p className="age">Âge: {dog.age}</p>
                                <span>Race: {dog.race}</span> <br />
                                <span>Sexe: {dog.sexe}</span> <br />
                                <button
                                    type="button"
                                    onClick={() => navigate(`/Ficheperso_animal/${dog._id}`)}
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pagination */}
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

export default Fiche_galeriechien;
