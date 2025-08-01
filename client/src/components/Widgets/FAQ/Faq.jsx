// src/components/Pages/Faq.jsx
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
      "Vous pouvez consulter les profils disponibles sur notre site. Une fois que vous avez trouvé un compagnon qui vous correspond, remplissez le formulaire d’adoption. Notre équipe vous contactera rapidement.",
  },
  {
    question: "Quels sont les frais d’adoption ?",
    answer:
      "Les frais varient selon l’animal. Ils couvrent les soins vétérinaires, la stérilisation, les vaccins, etc.",
  },
  {
    question: "Peut-on visiter le refuge ?",
    answer:
      "Oui, sur rendez-vous. Contactez-nous via notre page de contact pour organiser une visite.",
  },
  {
    question: "Acceptez-vous les dons matériels ?",
    answer:
      "Oui, nous acceptons volontiers les dons de nourriture, jouets, couvertures... Merci pour votre soutien !",
  },
];

const Faq = () => {
  return (
    <div className="faq-page">
      <h2 className="faq-title">Foire Aux Questions (FAQ)</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className="faq-question"
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails className="faq-answer">
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
