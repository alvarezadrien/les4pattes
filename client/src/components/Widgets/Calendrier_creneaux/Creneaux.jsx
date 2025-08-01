import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Creneaux.css";

const fakeCreneaux = {
  "2025-08-02": ["10h00 - 10h30", "11h00 - 11h30", "14h00 - 14h30"],
  "2025-08-03": ["09h00 - 09h30", "15h00 - 15h30"],
  "2025-08-04": ["10h00 - 10h30", "13h00 - 13h30", "16h00 - 16h30"],
};

const CalendrierCreneaux = ({ onDateChange, onCreneauChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState("");

  const getCreneauxForDate = (date) => {
    const key = date.toISOString().split("T")[0]; // Format : YYYY-MM-DD
    return fakeCreneaux[key] || [];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedCreneau(""); // Reset du créneau si date changée
    if (onDateChange) {
      const formattedDate = date.toLocaleDateString("fr-BE");
      onDateChange(formattedDate);
    }
  };

  const handleCreneauClick = (creneau) => {
    setSelectedCreneau(creneau);
    if (onCreneauChange) {
      onCreneauChange(creneau);
    }
  };

  return (
    <div className="calendrier-container">
      <h2>Réserver un créneau bénévole</h2>
      <form className="form-creneau">
        <label>Date :</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          placeholderText="Choisissez une date"
          className="datepicker"
        />

        {selectedDate && (
          <>
            <label>Créneau disponible :</label>
            <div className="creneaux-list">
              {getCreneauxForDate(selectedDate).length > 0 ? (
                getCreneauxForDate(selectedDate).map((creneau) => (
                  <button
                    type="button"
                    key={creneau}
                    className={`creneau-btn ${
                      selectedCreneau === creneau ? "selected" : ""
                    }`}
                    onClick={() => handleCreneauClick(creneau)}
                  >
                    {creneau}
                  </button>
                ))
              ) : (
                <p className="no-creneaux">
                  Aucun créneau disponible ce jour-là.
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CalendrierCreneaux;
