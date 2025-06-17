import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filtres from "../../../Widgets/Filtres/Filtre"; // Vérifiez le chemin

const ITEMS_PER_PAGE = 12;

const Fiche_galeriechien = () => {
    const navigate = useNavigate();

    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [sexeFilter, setSexeFilter] = useState("");
    const [tailleFilter, setTailleFilter] = useState("");
    const [dureeRefugeFilter, setDureeRefugeFilter] = useState("");
    const [comportementFilter, setComportementFilter] = useState("");
    const [ententeFilter, setEntenteFilter] = useState("");

    const fetchDogs = () => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("espece", "Chien");
        params.append("adopte", "false");

        if (sexeFilter) params.append("sexe", sexeFilter);
        if (tailleFilter) params.append("taille", tailleFilter);
        if (comportementFilter) params.append("comportement", comportementFilter);
        if (ententeFilter) params.append("ententeAvec", ententeFilter);
        if (dureeRefugeFilter) params.append("dureeRefuge", dureeRefugeFilter);

        fetch(`${process.env.REACT_APP_API_URL}/api/animaux?${params.toString()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setDogs(data);
                setCurrentPage(1);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDogs();
    }, [sexeFilter, tailleFilter, dureeRefugeFilter, comportementFilter, ententeFilter]);

    if (loading) return <p>Chargement des chiens...</p>;
    if (error) return <p>Erreur : {error}</p>;

    const totalPages = Math.ceil(dogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDogs = dogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="page-container">
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

            <section className="container_appercu">
                <div className="animal_group_chat">
                    {currentDogs.length > 0 ? (
                        currentDogs.map((dog, index) => (
                            <div className="item" key={`dog-${startIndex + index}`}>
                                <img
                                    src={
                                        dog.image
                                            ? `${process.env.REACT_APP_API_URL}${dog.image}`
                                            : "/img/default.jpg"
                                    }
                                    alt={`Photo de ${dog.nom}`}
                                />
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
                        ))
                    ) : (
                        <p>Aucun chien ne correspond à vos critères de recherche.</p>
                    )}
                </div>
            </section>

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
