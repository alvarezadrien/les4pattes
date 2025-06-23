import React, { useState } from "react";
import "./Cruaute.css";

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button
        className="accordion-title"
        onClick={onClick}
        aria-expanded={isOpen} // Ajout de l'attribut aria-expanded
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const Cruaute = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="container_cruaute1">
        <div className="paragraphe_cruaute1">
          <h2 className="titre_cruaute">La Cruauté Animale</h2>
          <p>
            La cruauté animale est inacceptable. Chaque année, des milliers
            d'animaux souffrent d'abandon, de maltraitance ou de négligence.
            Certains propriétaires vont jusqu'à infliger des violences physiques,
            comme des coups causant des blessures, ou les privent de soins,
            de nourriture, d’eau ou d’un environnement adapté à leurs besoins.
          </p>
        </div>
        <div className="image_cruaute1">
          <img src="/img/chien_route_abandon.webp" alt="Chien abandonné" />
        </div>
      </div>

      <div className="container_cruaute2">
        <div className="image_cruaute2">
          <img src="/img/chat_abandon1.jpeg" alt="Chat abandonné" width={310} height={310} />
        </div>
        <div className="paragraphe_cruaute2">
          <p>
            La lutte contre la maltraitance est l’une des grandes priorités de
            notre refuge. En sensibilisant et en agissant, nous pouvons construire
            un monde où ces injustices n’ont plus leur place.
          </p>
        </div>
      </div>

      <div className="container_cruaute3">
        <div className="div_cruaute1">
          <h2>Que faire si vous êtes témoin de cruauté animale ?</h2>
        </div>
        <div className="div_cruaute2">
          <p>
            Si vous êtes témoin d’une situation de cruauté ou de négligence,
            contactez notre numéro d’urgence au **0492 95 32 33** en cas
            de situation grave, ou la police au **101**. Pour les animaux
            autres que des chiens et chats, contactez-nous afin que nous puissions
            leur venir en aide dans les meilleures conditions.
          </p>
        </div>
        <div className="div_cruaute3">
          <p>
            N’hésitez pas à prendre des notes ou des photos de la situation afin
            d’aider nos équipes à mieux comprendre et intervenir rapidement.
          </p>
        </div>
      </div>

      <div className="container_cruaute4">
        <div className="image_cruaute3">
          <img src="/img/animale_cruauté_canva.png" alt="Animal maltraité" width={450} />
        </div>
        <div className="paragraphe_cruaute4">
          <h2>Petites actions, grands impacts</h2>
          <p>
            La cruauté envers les animaux est une réalité que nous ne pouvons
            ignorer. Mais chacun de nous peut contribuer à changer les choses,
            même à petite échelle. Voici quelques façons d'agir pour défendre
            ceux qui ne peuvent pas parler pour eux-mêmes.
          </p>
        </div>
        <div className="image_cruaute4">
          <img src="/img/chat_maltraitance_canva.png" alt="Chat maltraité" width={450} />
        </div>
      </div>

      <hr className="hr_cruaute" />

      <div className="container_cruaute5">
        <div className="accordion-container">
          <AccordionItem
            title="Éduquez votre entourage"
            isOpen={openIndex === 0}
            onClick={() => handleAccordionClick(0)}
          >
            <ul>
              <li>Reconnaître les signes de maltraitance ou de négligence</li>
              <li>Apprendre le respect et la bienveillance envers les animaux</li>
              <li>Encourager l’adoption plutôt que l’achat d’animaux</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Soyez un consommateur responsable"
            isOpen={openIndex === 1}
            onClick={() => handleAccordionClick(1)}
          >
            <ul>
              <li>Évitez les produits issus de l’exploitation animale</li>
              <li>Soutenez les entreprises respectueuses du bien-être animal</li>
            </ul>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
};

export default Cruaute;