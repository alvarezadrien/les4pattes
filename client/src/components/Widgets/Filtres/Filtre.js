import React, { useState } from 'react';
import './Filtre.css'; // Assurez-vous que ce fichier CSS existe

const Filtre = ({
    sexe, setSexe,
    taille, setTaille,
    dureeRefuge, setDureeRefuge,
    comportement, setComportement,
    entente, setEntente,
    disableTaille = false // Prop pour désactiver le filtre taille si nécessaire
}) => {
    const [showPopup, setShowPopup] = useState(false); // État pour contrôler la visibilité de la popup

    const handleResetFilters = () => {
        // Réinitialise tous les états des filtres à leurs valeurs initiales (chaîne vide)
        setSexe('');
        setTaille('');
        setDureeRefuge('');
        setComportement('');
        setEntente('');
        setShowPopup(false); // Ferme la popup après la réinitialisation
    };

    return (
        <div className="filtre-container">
            <button className="open-filters-button" onClick={() => setShowPopup(true)}>
                Nouvelle recherche
            </button>

            {showPopup && (
                <div className="filtre-popup-overlay">
                    <div className="filtre-popup-content">
                        <h2>Filtres</h2>
                        <ul className="ul_filtre_popup">
                            <li>
                                <select
                                    value={taille}
                                    onChange={(e) => setTaille(e.target.value)}
                                    disabled={disableTaille}
                                >
                                    <option value="">Taille</option>
                                    <option value="petit">Petite</option>
                                    <option value="moyen">Moyenne</option>
                                    <option value="grand">Grande</option>
                                </select>
                            </li>

                            <li>
                                <select
                                    value={sexe}
                                    onChange={(e) => setSexe(e.target.value)}
                                >
                                    <option value="">Sexe</option>
                                    <option value="Mâle">Mâle</option>
                                    <option value="Femelle">Femelle</option>
                                </select>
                            </li>

                            <li>
                                <select
                                    value={entente}
                                    onChange={(e) => setEntente(e.target.value)}
                                >
                                    <option value="">Entente avec</option>
                                    <option value="enfants">Enfants</option>
                                    <option value="chiens">Chiens</option>
                                    <option value="chats">Chats</option>
                                    <option value="familles">Idéal pour les familles</option>
                                </select>
                            </li>

                            <li>
                                <select
                                    value={dureeRefuge}
                                    onChange={(e) => setDureeRefuge(e.target.value)}
                                >
                                    <option value="">Durée au refuge</option>
                                    <option value="-1mois">Moins d’un mois</option>
                                    <option value="1-3mois">1 à 3 mois</option>
                                    <option value="3-6mois">3 à 6 mois</option>
                                    <option value="+6mois">Plus de 6 mois</option>
                                </select>
                            </li>

                            <li>
                                <select
                                    value={comportement}
                                    onChange={(e) => setComportement(e.target.value)}
                                >
                                    <option value="">Comportement</option>
                                    <option value="calme">Calme</option>
                                    <option value="actif">Actif</option>
                                    <option value="affectueux">Affectueux</option>
                                    <option value="independant">Indépendant</option>
                                    <option value="sociable">Sociable</option>
                                    <option value="joueur">Joueur</option>
                                    <option value="curieux">Curieux</option>
                                    <option value="calin">Câlin</option>
                                </select>
                            </li>
                        </ul>
                        <div className="popup-actions">
                            <button className="reset-filters-button" onClick={handleResetFilters}>
                                Réinitialiser la recherche
                            </button>
                            <button className="close-popup-button" onClick={() => setShowPopup(false)}>
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filtre;