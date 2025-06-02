import React from 'react';
import './Filtre.css';

const Filtre = ({ sexe, setSexe, taille, setTaille }) => {
    return (
        <div className="filtre">
            <ul className="ul_filtre">
                <li>
                    <select value={taille} onChange={(e) => setTaille(e.target.value)}>
                        <option value="">Taille</option>
                        <option value="petit">Petite</option>
                        <option value="moyen">Moyenne</option>
                        <option value="grand">Grande</option>
                    </select>
                </li>

                <li>
                    <select value={sexe} onChange={(e) => setSexe(e.target.value)}>
                        <option value="">Sexe</option>
                        <option value="Mâle">Mâle</option>
                        <option value="Femelle">Femelle</option>
                    </select>
                </li>
            </ul>
        </div>
    );
};

export default Filtre;
