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
      <div className=""></div>
    </>
  );
};

export default Savoir;
