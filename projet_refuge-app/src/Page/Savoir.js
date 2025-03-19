import React from "react";
import "../Savoir.css";

const Savoir = () => {
  return (
    <>
      <div className="container_savoir1">
        <div className="div_savoir1">
          <div>
            <h1>Ce qu'il faut savoir avant d'adopter</h1>
          </div>
          <div>
            <p>
              Adopter un animal est une belle démarche, mais elle demande
              réflexion et préparation. Voici tout ce que vous devez savoir pour
              vous assurer que votre adoption se passe dans les meilleures
              conditions
            </p>
          </div>
          <div>
            <button>Chiens</button>
            <button>Chats</button>
          </div>
        </div>
        <div className="image_savoir1">
          <img src="/img/chat_refuge_canva.png" alt="" width={400} />
        </div>
      </div>

      {/* grid */}
      <div className="container_savoir_grid">
        <div className="grid_item_savoir1">
          <h3>Votre lieu de vie</h3>
          <p>
            Si vous êtes dans un appartement, assurez-vous que l'espace est
            adapté aux besoins du futur anima. Par exemple, les chats s'adaptent
            plus simplement à une vie en appartement tandis que les chiens, en
            fonction de leur taille et de l'énergie qu'ils dépensent, ils
            peuvent nécessiter un plus grand espace et des sorties fréquentes.
          </p>
        </div>
        <div className="grid_item_savoir">
          <img src="/img/pexels_veto_soins.jpg" alt="" />
        </div>
        <div className="grid_item_savoir2">
          <h3>Un engagement à long terme</h3>
          <p>
            Adopter un animal c'est un grand engagement pour plusieurs années.
            Le futur adopter sera un membres de vôtre famille, avec ses besoins
            en affection régulière, des soins quand il le faut.
          </p>
        </div>
        <div className="grid_item_savoir">
          <img src="/img/chien_chat_nature.png" alt="" />
        </div>
        <div className="grid_item_savoir3">
          <h3>Santé et bien être de l'animal</h3>
          <p>
            Tous les animaux qui sont à adopter sont sur notre page web
            sur "Galeriechien" et "Galeriechat". Nos animaux sont tous
            stérilisé, pucés et vaccinés.
          </p>
        </div>
        <div className="grid_item_savoir">
          <img src="/img/pexels_chien_panier.jpg" alt="" />
        </div>
      </div>

      {/* image bannière */}
      <div className="image_savoir3">
        <img src="/img/chiens2_main.png" alt="" width={650} height={310} />
      </div>

      <div className="container_savoir2">
        <div className="div_savoir2">
          <h3>Les frais à prévoir</h3>
          <ul>
            <li>Nourriture adapté</li>
            <li>Accesoires(panier, litière, jouets, laisse, ...)</li>
            <li>Frais de soins véterinaire</li>
          </ul>
        </div>
        <div className="div_savoir3">
          <h3>Prêt à adopter ?</h3>
          <p>
            Prenez le temps de bien réfléchir, et si vous êtes prêt à adopter
            votre futur ami à quatre pattes offrez lui une nouvelle maison.
            Contactez nous des maintenant pour en savoir plus !
          </p>
        </div>
        <div className="div_savoir4">
          <h3>Période d'adaptation</h3>
          <p>
            Lorsque vous adopter un animal, il est tout à fait normal que
            l'animal sera un peu effrayer de ce nouvel environnement, pour aider
            cette étape d'adaptation offrez lui un environnement calme et sûr.
            Donnez lui du temps pour s'habituer à se nouvel environnement et à
            vous.
          </p>
        </div>
      </div>
    </>
  );
};

export default Savoir;
