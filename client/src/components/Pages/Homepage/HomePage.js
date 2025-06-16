import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Animalitem from "../../Widgets/Animal_item/Animalitem";
import Carte_carrousel from "../../Widgets/Carrousel/Carte_carrousel";
import Avis from "../Avis/Avis";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  function redirectApropos() {
    console.log("Inside redirect A propos");
    navigate("/Apropos");
  }

  function redirectChien() {
    console.log("Inside redirect Chien");
    navigate("/Galeriechien");
  }

  function redirectChat() {
    console.log("Inside redirect Chat");
    navigate("/Galeriechat");
  }

  const images = [
    "/img/img_chienchat_container.jpg",
    "/img/photo-chat_home5.avif",
    "/img/dog-photo_home2.jpg",
    "/img/photo-chien-chat_home4.avif",
    "/img/dog-home_photo3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Texte à écrire
  const text =
    "Notre association pour les animaux perdus et abandonnés, depuis plus de 100 ans en Belgique";
  const typingSpeed = 50;

  useEffect(() => {
    if (textIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + text.charAt(textIndex));
        setTextIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, text]);

  return (
    <div className="Page_home">
      {/* Div container intro */}
      <div className="container_img">
        <h1 className="h1_titre">
          Les 4 pattes
          <img src="/img/pattes_blanche.png" alt="" width={40} height={40} />
        </h1>
        <div id="content">{typedText}</div>
        <div className="circle_img0">
          <div className="circle_img1">
            <img src={images[currentImage]} alt="" width={360} height={350} />
          </div>
          <div className="circle_img2">
            <img src="/img/image chien.png" alt="" width={235} height={210} />
          </div>
          <div className="circle_img3">
            <img src="/img/images.jpeg" alt="" width={200} height={200} />
          </div>
        </div>
        <button
          type="button"
          className="button_propos"
          onClick={redirectApropos}
        >
          À propos
        </button>
      </div>

      {/* Div container choix */}
      <div className="container_choix">
        <div className="container_choix1">
          <img
              src="/img/chien img choix.jpeg"
            alt="image chien"
            width={470}
            height={300}
            onClick={redirectChien}
          />
          <button className="button_choix_chiens" onClick={redirectChien}>
            Nos chiens
          </button>
        </div>
        <div className="container_choix2">
          <img
            src="/img/images.jpeg"
            alt=""
            width={470}
            height={300}
            onClick={redirectChat}
          />
          <button className="button_choix_chats" onClick={redirectChat}>
            Nos chats
          </button>
        </div>
      </div>

      {/* Div leur maison */}
      <div className="leur_maison">
        <span className="span_maison">Ils ont trouvé une maison</span>
        <br />
        <span className="nombre">18567</span>
        <img src="/img/hero-dog.png" alt="" width={280} height={280} />
      </div>

      {/* Importation code carte carrousel */}
      <div className="container_carte">
        <h3 className="titre_carte">
          <img src="/img/pattes.png" alt="" width={40} height={40} />
          Animaux à adopter
          <img src="/img/pattes.png" alt="" width={40} height={40} />
        </h3>
        <Carte_carrousel />
      </div>

      {/* Div home propos */}
      <div className="home_propos">
        <h2>
          <img src="/img/pattes.png" alt="" width={40} height={40} />
          À propos de nous
          <img src="/img/pattes.png" alt="" width={40} height={40} />
        </h2>
        <br />
        <p className="paragraphe_home_propos">
          L’association Protectrice des Animaux Les 4 pattes est l’une des plus{" "}
          <br />
          anciennes sociétés de protection animale de Belgique. Nous hébergeons{" "}
          <br />
          des chiens et chats dans notre centre <br />
          d’accueils à Bruxelles (Anderlecht). <br />
          <br />
          Nous accueillons en moyenne près de 100 chiens <br />
          et chats par mois, victimes d’abandons. Nous <br />
          prenons soin d’eux et nous efforçons de leur <br />
          trouver des familles pour les adopter.
        </p>
        <div className="home_propos_img">
          <img src="/img/img_home_propos.jpg" alt="" />
        </div>
        <button type="button" onClick={redirectApropos}>
          Notre histoire
        </button>
      </div>

      {/* Div aides soins */}
      <div className="container_aides_soins">
        <div className="div_soins">
          <h2 className="h2_titre_soins">Nos aides et soins</h2>
          <div className="icon_ensemble">
            <div className="box_soins1">
              <div className="icon_soins1">
                <img
                  src="/img/maison-pour-animaux-de-compagnie.png"
                  alt=""
                  width={200}
                  height={200}
                />
                <h3>L'accueil des animaux</h3>
                <button>
                  <a href="/L'accueil des animaux">Voir plus</a>
                </button>
              </div>
            </div>
            <div className="box_soins2">
              <div className="icon_soins2">
                <img
                  src="/img/sensibilisation.png"
                  alt=""
                  width={200}
                  height={200}
                />
                <h3>Sensibilisation</h3>
                <button>
                  <a href="/Sensibilisation">Voir plus</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Avis /> {/* <<< Utilisation de Avis directement */}
    </div>
  );
};

export default HomePage;