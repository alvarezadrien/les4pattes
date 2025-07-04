import React, { useEffect, useState } from "react";
import './Compagnons_adopter.css';
import Loading from '../../Widgets/Loading/Loading.jsx';

const Compagnons_adopter = () => {
    const [animaux, setAnimaux] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                if (Array.isArray(data)) {
                    setAnimaux(data);
                } else if (data.animaux && Array.isArray(data.animaux)) {
                    setAnimaux(data.animaux);
                } else {
                    setAnimaux([]);
                    setError("Structure de données inattendue.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimaux();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p>Erreur : {error}</p>;
    if (!animaux.length) return <p>Aucun compagnon adopté pour l’instant.</p>;

    const renderCard = (animal, index) => (
        <div className="item_flip-card" key={animal._id || index}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={animal.images && animal.images[0] ? animal.images[0] : "/img/chat_galeriefiche.jpg"}
                        alt={`Photo de ${animal.nom}`}
                    />
                    <h3>{animal.nom}</h3>
                </div>
                <div className="flip-card-back">
                    {animal.descriptionAdoption && animal.descriptionAdoption.trim() !== "" ? (
                        <p className="animal-description">{animal.descriptionAdoption}</p>
                    ) : (
                        <p className="animal-description">Ce compagnon a trouvé une famille ♥</p>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="page_compagnons">
            <h1 className="h1_compagnons">
                <img src="/img/pattes.png" alt="pattes" width={40} height={40} />
                Nos compagnons adoptés
                <img src="/img/pattes.png" alt="pattes" width={40} height={40} />
            </h1>

            <section className="container_compagnons">
                <div className="animal_group_compagnons">
                    {animaux.map(renderCard)}
                </div>
            </section>
        </div>
    );
};

export default Compagnons_adopter;
