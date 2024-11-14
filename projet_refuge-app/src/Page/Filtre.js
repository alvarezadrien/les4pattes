import React, { useState } from 'react';
import '../Filtre.css'

const Filtres = () => {
    // États pour gérer la sélection
    const [animalSelectionne, setAnimalSelectionne] = useState(null);
    const [tailleSelectionnee, setTailleSelectionnee] = useState("");
    const [sexeSelectionne, setSexeSelectionne] = useState("");

    // Gestion du clic pour les filtres Chiens/Chats
    const handleAnimalClick = (animal) => {
        setAnimalSelectionne(animal);
    };

    // Fonction de gestion du clic sur le bouton
    const handleButtonClick = () => {
        console.log("Filtres appliqués :", {
            animal: animalSelectionne,
            taille: tailleSelectionnee,
            sexe: sexeSelectionne
        });
    };

    return (
        <div className="filtre">
            <ul className="ul_filtre">
                <li
                    className={animalSelectionne === 'Chiens' ? 'active' : ''}
                    onClick={() => handleAnimalClick('Chiens')}
                >
                    Chiens
                </li>
                <li
                    className={animalSelectionne === 'Chats' ? 'active' : ''}
                    onClick={() => handleAnimalClick('Chats')}
                >
                    Chats
                </li>

                {/* Sélection de la taille */}
                <li>
                    <select
                        value={tailleSelectionnee}
                        onChange={(e) => setTailleSelectionnee(e.target.value)}
                    >
                        <option value="">Taille</option>
                        <option value="Petite">Petite</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Grande">Grande</option>
                    </select>
                </li>

                {/* Sélection du sexe */}
                <li>
                    <select
                        value={sexeSelectionne}
                        onChange={(e) => setSexeSelectionne(e.target.value)}
                    >
                        <option value="">Sexe</option>
                        <option value="Mâle">Mâle</option>
                        <option value="Femelle">Femelle</option>
                    </select>
                </li>
            </ul>

            {/* Bouton pour appliquer les filtres */}
            <button onClick={handleButtonClick} className="appliquer-filtre">
                Recherche
            </button>
        </div>
    );
};

export default Filtres;
