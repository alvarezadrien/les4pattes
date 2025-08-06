import React, { useState } from "react";
import "./FiltresCategorie.css";

const categories = [
  "chien",
  "chat",
  "humain",
  "jouet",
  "croquettes",
  "accessoires",
  "friandises",
  "goodies",
  "vêtements",
  "gamelles"
];

const FiltresCategorie = ({ selectedCategorie, onChange }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSelect = (categorie) => {
    onChange(categorie);
    setPopupVisible(false);
  };

  return (
    <div className="filtre-popup-wrapper">
      <button
        className="btn-filtre-toggle"
        onClick={() => setPopupVisible(!popupVisible)}
      >
        Filtres{" "}
        {selectedCategorie &&
          selectedCategorie !== "" &&
          `: ${selectedCategorie}`}
      </button>

      {popupVisible && (
        <div className="popup-filtre">
          <button
            className="fermer-filtre"
            onClick={() => setPopupVisible(false)}
          >
            ✕
          </button>
          <ul className="liste-filtres">
            <li
              className={selectedCategorie === "" ? "actif" : ""}
              onClick={() => handleSelect("")}
            >
              Tous les produits
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={selectedCategorie === cat ? "actif" : ""}
                onClick={() => handleSelect(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FiltresCategorie;
