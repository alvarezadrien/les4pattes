import React, { useEffect, useState } from "react";
import "../Mon_compte.css";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const QuizPopup = ({ user, onClose }) => {
    const [animals, setAnimals] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await fetch(`${API_URL}/api/animaux`);
                const data = await res.json();
                const result = user.quizResult || "";
                const comportements = result.toLowerCase().split("comportement recommandé :")[1]?.split(".")[0]?.split(",") || [];
                const races = result.match(/Quelques races adaptées : (.*)/)?.[1]?.split(", ") || [];

                const filtered = data.filter(animal => {
                    if (animal.adopte) return false;

                    const raceMatch = races.includes(animal.race);
                    const comportementMatch = animal.comportement?.some(c =>
                        comportements.some(k => c.toLowerCase().includes(k.trim()))
                    );
                    return raceMatch || comportementMatch;
                });

                setAnimals(filtered);
            } catch (err) {
                console.error("Erreur lors du chargement des animaux :", err);
            }
        };

        fetchAnimals();
    }, [user]);

    return (
        <div className="popup-overlay">
            <div className="popup-modal quiz-popup">
                <div className="popup-header">
                    <h3>Résultat du Quiz</h3>
                    <button onClick={onClose} className="close-popup-btn">&times;</button>
                </div>

                <div className="popup-body">
                    <p className="quiz-result-text">{user.quizResult}</p>

                    {animals.length > 0 && (
                        <>
                            <h4 className="quiz-match-title">🐶🐱 Animaux correspondant à votre profil :</h4>
                            <div className="quiz-matching-list">
                                {(showAll ? animals : animals.slice(0, 6)).map((a) => (
                                    <div key={a._id} className="quiz-animal-card">
                                        <p className="quiz-animal-name">{a.nom}</p>
                                        <button
                                            className="quiz-animal-button"
                                            onClick={() => navigate(`/Ficheperso_animal/${a._id}`)}
                                        >
                                            Voir son profil
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {animals.length > 6 && (
                                <button
                                    className="quiz-btn"
                                    onClick={() => setShowAll(prev => !prev)}
                                >
                                    {showAll ? "Voir moins" : "Voir plus"}
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="popup-buttons">
                    <button onClick={onClose} className="close-btn">Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default QuizPopup;
