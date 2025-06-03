import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filtre from "../../../Widgets/Filtres/Filtre";

const ITEMS_PER_PAGE = 12;

const Fiche_galeriechien = () => {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sexe, setSexe] = useState("");
    const [taille, setTaille] = useState("");

    useEffect(() => {
        const fetchDogsAdopted = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/animaux?espece=Chien&adopte=true");
                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                const data = await res.json();

                const chiensAdoptes = Array.isArray(data) ? data : (data.animaux || []);
                setDogs(chiensAdoptes);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDogsAdopted();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [sexe, taille]);

    if (loading) return <p>Chargement des chiens adoptés...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!dogs.length) return <p>Aucun chien adopté pour l’instant.</p>;

    const filteredDogs = dogs.filter((dog) => {
        const matchSexe = sexe ? dog.sexe === sexe : true;
        const matchTaille = taille ? dog.taille === taille : true;
        return matchSexe && matchTaille;
    });

    const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDogs = filteredDogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="page-container">
            <Filtre sexe={sexe} setSexe={setSexe} taille={taille} setTaille={setTaille} />

            <section className="container_appercu">
                <div className="animal_group_chien">
                    {currentDogs.map((dog, index) => (
                        <div className="item" key={`dog-${startIndex + index}`}>
                            <img src={dog.image || "/img/chien_default.jpg"} alt={`Photo de ${dog.nom}`} />
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
