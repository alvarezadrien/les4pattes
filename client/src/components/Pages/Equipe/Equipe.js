import React from "react";
import "./Equipe.css";

const Equipe = () => {
  return (
    <>
      <div className="container_equipe1">
        <div className="div_container_equipe1">
          <div className="div_equipe1">
            <h1>Notre équipe</h1>
            <p>
              Au Refuge les 4 pattes, nous sommes fiers de notre équipe dévouée
              qui travaille sans relâche pour offrir un environnement sûr et
              aimant à nos amis à quatre pattes. Chacun de nos membres joue un
              rôle essentiel dans le bien-être de nos animaux. Découvrez
              ci-dessous les différents rôles au sein de notre refuge :
            </p>
          </div>
          <div className="image_equipe1">
            <img src="/img/img_personnel.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="h2_equipe1">
        <h2>Le rôle de notre équipe</h2>
      </div>

      <div className="container_equipe2">
        <div className="div_box1">
          <div className="image_box">
            <img src="/img/veto_equipe.webp" alt="" />
          </div>
          <div className="text_box">
            <p>
              Le vétérinaire du refuge est responsable de la santé physique et
              mentale de nos animaux. Il effectue des examens réguliers,
              administre des vaccinations, et traite les maladies ou blessures.
              Son expertise est essentielle pour assurer que chaque animal est
              en bonne santé et prêt à trouver un nouveau foyer.
            </p>
          </div>
        </div>

        <div className="div_box2">
          <div className="image_box">
            <img src="/img/soigneurs_image.jpg" alt="" />
          </div>
          <div className="text_box">
            <p>
              Nos soigneurs animaliers sont au cœur du refuge. Ils s'occupent
              quotidiennement des chiens et des chats en leur offrant
              nourriture, soins, et affection. Ils passent du temps avec les
              animaux, les sortent en promenade, et jouent avec eux pour
              garantir leur bien-être physique et émotionnel.
            </p>
          </div>
        </div>

        <div className="div_box3">
          <div className="image_box">
            <img src="/img/nettoie_refuge.jpg" alt="" />
          </div>
          <div className="text_box">
            <p>
              Bien que souvent sous-estimé, l'agent de nettoyage joue un rôle
              essentiel pour maintenir un environnement sain et sécurisé pour
              nos animaux. Il s'assure que tous les espaces sont propres, ce qui
              aide à prévenir les maladies et à offrir un cadre agréable tant
              pour les animaux que pour les visiteurs.
            </p>
          </div>
        </div>

        <div className="div_box4">
          <div className="h3_box">
            <h3>Chargé de l'adoption</h3>
          </div>
          <div className="text_box">
            <p>
              Le chargé de l'adoption est responsable de trouver des foyers
              aimants pour nos animaux. Il rencontre les potentiels adoptants,
              évalue leur compatibilité avec les animaux et les aide à
              comprendre les besoins spécifiques de chaque compagnon. Son
              objectif est de garantir que chaque animal trouve un foyer où il
              sera heureux et bien traité.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Equipe;
