// src/components/Widgets/FaqSection.jsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Faq.css";

const faqData = [
  {
    question: "Comment adopter un animal ?",
    answer:
      "Consultez les profils disponibles, remplissez le formulaire d’adoption, et nous vous contacterons rapidement pour organiser une rencontre.",
  },
  {
    question: "Quels sont les frais d’adoption ?",
    answer:
      "Les frais varient selon l’animal. Ils couvrent les soins vétérinaires, les vaccins, la stérilisation, etc.",
  },
  {
    question: "Peut-on visiter le refuge ?",
    answer:
      "Oui, uniquement sur rendez-vous. Vous pouvez nous contacter via la page Contact pour réserver une visite.",
  },
  {
    question: "Acceptez-vous les dons matériels ?",
    answer:
      "Absolument ! Nous acceptons les croquettes, jouets, couvertures, et tout autre matériel utile. Merci pour votre générosité.",
  },
];

const FaqSection = () => {
  return (
    <section className="faq-section" id="faq">
      <h2 className="faq-title">Foire Aux Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#778d45" }} />}
              className="faq-question"
            >
              <Typography className="faq-question-text">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="faq-answer">
              <Typography className="faq-answer-text">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
