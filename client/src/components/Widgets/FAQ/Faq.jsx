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
  {
    question: "Puis-je adopter si je vis en appartement ?",
    answer:
      "Oui, bien sûr ! Certains animaux s’adaptent très bien à la vie en appartement. Nous vous aiderons à trouver un compagnon compatible avec votre environnement.",
  },
  {
    question: "Combien de temps prend une adoption ?",
    answer:
      "Le processus peut prendre entre quelques jours et deux semaines, selon votre disponibilité et les besoins de l’animal. Nous privilégions une adoption réfléchie et adaptée.",
  },
  {
    question: "Comment savoir si un animal est encore disponible ?",
    answer:
      "Chaque profil d’animal est mis à jour en temps réel. S’il est indiqué comme “adopté” ou “en cours d’adoption”, il n’est plus disponible. N’hésitez pas à nous contacter pour confirmation.",
  },
  {
    question: "Quels sont les critères pour adopter un animal ?",
    answer:
      "Nous recherchons des foyers aimants et responsables. Il est important de pouvoir offrir un environnement stable, de l’attention et des soins appropriés à l’animal.",
  },
  {
    question: "Proposez-vous des conseils après l’adoption ?",
    answer:
      "Oui, nous restons disponibles après l’adoption pour répondre à vos questions et vous conseiller sur l’alimentation, l’éducation, ou l’intégration de votre nouvel animal.",
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
