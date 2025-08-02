// src/components/Widgets/Quiz.jsx
import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { LinearProgress, Box } from "@mui/material";

const quizIcon = "/img/quiz.png"; // image dans /public/img/

const questions = [
  {
    question: "Quel est votre rythme de vie ?",
    options: ["Très actif", "Calme", "Sportif", "Sédentaire"],
  },
  {
    question: "Quel type de logement avez-vous ?",
    options: ["Appartement", "Maison sans jardin", "Maison avec jardin"],
  },
  { question: "Avez-vous des enfants ?", options: ["Oui", "Non"] },
  { question: "Avez-vous d'autres animaux ?", options: ["Oui", "Non"] },
  { question: "Avez-vous déjà eu un animal ?", options: ["Oui", "Non"] },
  {
    question: "Temps disponible par jour pour l’animal ?",
    options: ["Plus de 3h", "1-2h", "Moins de 1h"],
  },
  {
    question: "Quel tempérament préférez-vous ?",
    options: ["Joueur", "Calme", "Protecteur", "Indépendant"],
  },
  {
    question: "Souhaitez-vous promener votre animal ?",
    options: ["Oui, tous les jours", "De temps en temps", "Non"],
  },
  {
    question: "Votre environnement est-il ?",
    options: ["Très calme", "Animé", "Bruit modéré"],
  },
  {
    question: "Préférez-vous un animal plutôt ?",
    options: ["Petit", "Moyen", "Grand"],
  },
  {
    question: "Êtes-vous souvent en déplacement ?",
    options: ["Oui", "Parfois", "Rarement", "Jamais"],
  },
  {
    question: "Quel type de relation souhaitez-vous avec votre animal ?",
    options: ["Fusionnelle", "Complice", "Indépendante", "Plutôt calme"],
  },
];

const Quiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
    setAnswers(Array(questions.length).fill(""));
    setCurrent(0);
    setResult(null);
  };

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      generateResult(updatedAnswers);
    }
  };

  const generateResult = (answers) => {
    let type = "";
    let comportement = "";
    let races = [];

    const actif = ["Très actif", "Sportif"].includes(answers[0]);
    const calme = ["Calme", "Sédentaire"].includes(answers[0]);
    const peuDeTemps = answers[5] === "Moins de 1h" || answers[10] === "Oui";
    const besoinDePromenade = answers[7] === "Oui, tous les jours";
    const enAppartement = answers[1] === "Appartement";
    const fusionnel = answers[11] === "Fusionnelle";

    if (peuDeTemps && enAppartement) {
      type = "chat";
      comportement = "calme, indépendant, idéal pour la vie en appartement";
      races = ["British Shorthair", "Chartreux", "Ragdoll"];
    } else if (actif && besoinDePromenade && !enAppartement) {
      type = "chien";
      comportement = "joueur, sociable, aime les longues balades";
      races = ["Labrador", "Border Collie", "Golden Retriever"];
    } else if (answers[6] === "Indépendant" && peuDeTemps) {
      type = "chat";
      comportement = "indépendant, discret, apprécie la tranquillité";
      races = ["Européen", "Bleu Russe", "Siamois calme"];
    } else if (answers[2] === "Oui" && calme) {
      type = "chat ou chien";
      comportement = "doux, sociable, adapté aux enfants";
      races = [
        "Cavalier King Charles",
        "Golden Retriever",
        "Sacré de Birmanie",
      ];
    } else if (fusionnel && !peuDeTemps) {
      type = "chien";
      comportement = "affectueux, proche de l'humain, aime la compagnie";
      races = ["Berger Australien", "Cocker Spaniel", "Caniche"];
    } else {
      type = "chat ou chien";
      comportement = "équilibré, affectueux, facile à vivre";
      races = ["Bouledogue Français", "Sphynx", "Bichon", "Chat Européen"];
    }

    setResult(
      `✨ Vous êtes fait pour ${
        type === "chat ou chien" ? "un chat ou un chien" : "un " + type
      }.\n\nComportement recommandé : ${comportement}.\n\nQuelques races adaptées : ${races.join(
        ", "
      )}.`
    );
  };

  return (
    <>
      <div className="quiz-bubble quiz-left" onClick={toggleModal}>
        <img src={quizIcon} alt="Quiz" />
      </div>

      {isOpen && (
        <div className="quiz-overlay">
          <div className="quiz-box">
            <button className="quiz-close" onClick={toggleModal}>
              ✖
            </button>

            {!result ? (
              <>
                <h2 className="h2-quiz">{questions[current].question}</h2>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(current / questions.length) * 100}
                    color="success"
                  />
                </Box>
                <div className="quiz-options">
                  {questions[current].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>Résultat du quiz 🐾</h2>
                <pre className="quiz-result">{result}</pre>
                <button className="quiz-btn" onClick={toggleModal}>
                  Recommencer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
