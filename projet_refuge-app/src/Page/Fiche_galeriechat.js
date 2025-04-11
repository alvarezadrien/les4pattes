import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Fichegalerie = () => {
  const navigate = useNavigate();

  const cat = [
    {
      name: "Oreo",
      age: "1 An 1/2",
      race: "Lorem",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/oreo_1.2.jpg",
    },
    {
      name: "Bella",
      age: "1 an",
      race: "Européen",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_roux_1.1.jpg",
    },
    {
      name: "Coco",
      age: "1 An 1/2",
      race: "Siamois",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_siamois_1.2.jpg",
    },
    {
      name: "Rocky",
      age: "5 Ans",
      race: "Européen",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_gris_1.2.jpg",
    },
    {
      name: "Buddy",
      age: "1 An",
      race: "Bengal",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_bengal_1.3.jpg",
    },
    {
      name: "Bogart",
      age: "3 Ans",
      race: "Européen",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_blancnoir1.webp",
    },
    {
      name: "Casper",
      age: "2 Ans",
      race: "Européen",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_blanc_1.3.jpg",
    },
    {
      name: "Nala",
      age: "8 Mois",
      race: "ecaille de tortue",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/nala_1.1.jpg",
    },
    {
      name: "Luna",
      age: "7 Mois",
      race: "Européen",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/lune_1.2.jpg",
    },
    {
      name: "Gizmo",
      age: "7 Ans 1/2",
      race: "Européen",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_pexels_1.3.jpg",
    },
    {
      name: "Misty",
      age: "8 Ans",
      race: "Européen",
      Sexe: "Femelle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_grisblanc_1.3.png",
    },
    {
      name: "Leo",
      age: "3 Ans",
      race: "Européen",
      Sexe: "Mâle stérilisé",
      imgSrc: "/img/img_galeriechat/chat_grisligne_1.3.png",
    },
  ];

  return (
    <div className="page-container">
      <section className="container_appercu">
        <div className="animal_group_chat">
          {cat.map((cat, index) => (
            <div className="item" key={`cat-${index}`}>
              <img src={cat.imgSrc} alt={`Photo de ${cat.name}`} />
              <div className="item_info">
                <h3>{cat.name}</h3>
                <p className="age">Âge: {cat.age}</p>
                <span>Race: {cat.race}</span> <br />
                <span>Sexe: {cat.sexe}</span> <br />
                <button
                  type="button"
                  onClick={() => navigate(`/Ficheperso_animal`)}
                >
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fichegalerie;
