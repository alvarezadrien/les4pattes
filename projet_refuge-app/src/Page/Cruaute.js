import React from "react";
import "../Cruaute.css";

const Cruaute = () => {
  return (
    <div>
      <div className="container_cruaute1">
        <div className="paragraphe_cruaute1">
          <h2 className="titre_cruaute">La Cruauté Animale</h2>
          <p>
            La cruauté animale est inacceptable, chaque année des milliers
            d'animaux en souffrent, d'abandon, de maltraitance ou de la
            négligence de la part de leur maître. Certains propriétaires peuvent
            aller jusqu'à la maltraitance physique envers leurs animaux, par
            exemple : coups jusqu'aux blessures et manque de soins. La
            maltraitance de privation de nourriture, d'eau ou de la vie adaptée
            à leurs besoins.
          </p>
        </div>
        <div className="image_cruaute1">
          <img src="/img/chien_route_abandon.webp" alt="Chien abandonné" />
        </div>
      </div>

      <div className="container_cruaute2">
        <div className="image_cruaute2">
          <img src="/img/chat_abandon1.jpeg" alt="" width={290} />
        </div>
        <div className="paragraphe_cruaute2">
          <p>
            La lutte contre la maltraitance est l’une des grande priorités de
            notre refuge. En sensibilisant et en agissant, nous pouvons
            construire un monde où ces injustices n’ont plus leur place.
          </p>
        </div>
      </div>

      <div className="container_cruaute3">
        <div className="div_cruaute1">
          <h2>Que faire si vous êtes témoin de cruauté animale ?</h2>
        </div>
        <div className="div_cruaute2">
          <p>
            Si vous êtes témoin d'une situation de cruauté ou de négligence,
            vous pouvez appeler notre numéro d'urgence en cas de situation grave
            au 0492764208 ou la police au 101. Si c'est des animaux autres que
            des chiens et chats, contactez-nous et nous ferons le nécessaire
            pour qu'ils soient pris en charge avec les meilleurs soins et
            respect.
          </p>
        </div>
        <div className="div_cruaute3">
          <p>
            Prenez aussi des notes de la situation pour aider nos équipes à
            mieux comprendre.
          </p>
        </div>
      </div>

      <div className="container_cruaute4">
        <div className="image_cruaute3">
          <img src="/img/animale_cruauté_canva.png" alt="" width={450} />
        </div>
        <div className="paragraphe_cruaute4">
          <h2>Petites actions, grands impacts</h2>
          <p>
            La cruauté envers les animaux est une réalité que nous ne pouvons
            ignorer. Mais tout le monde peut contribuer à changer les choses,
            même à petite échelle. Voici quelques façons d'agir pour défendre
            ceux qui ne peuvent pas parler pour eux-mêmes.
          </p>
        </div>
        <div className="image_cruaute4">
          <img src="/img/chat_maltraitance_canva.png" alt="" width={450} />
        </div>
      </div>

      <hr className="hr_cruaute" />

      <div className="container_cruaute5">
        <div className="div_container_cruaute1">
          <div className="div_cruaute4">
            <h3>Éduquez votre entourage</h3>
          </div>
          <div className="div_cruaute5">
            <ol>
              <li>Les signes de maltraitance ou négligence</li>
              <li>Apprenez leur tout le respect envers les animaux</li>
              <li>Les avantages d’adopter un animal au lieu d’acheter</li>
            </ol>
          </div>
        </div>
        <div className="div_container_cruaute2">
          <div className="div_cruaute6">
            <h3>Soyez un consommateur responsable</h3>
          </div>
          <div className="div_cruaute7">
            <ol>
              <li>évitez les produits issus de l’exploitation animal</li>
              <li>Soutenez les entreprises respueuses du bien être animal</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cruaute;
