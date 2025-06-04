import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importe useAuth

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const { user } = useAuth(); // Récupère l'objet user du contexte d'authentification

  // Détermine si l'utilisateur est connecté en vérifiant si l'objet user existe
  const isAuthenticated = !!user;

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleMouseEnter = (index) => {
    setShowPopup(index);
  };

  const handleMouseLeave = () => {
    setShowPopup(null);
  };

  const handleClickProposition = (proposition) => {
    console.log("Proposition sélectionnée:", proposition);
  };

  const options = [
    {
      title: "Animaux",
      propositions: [
        { text: "Témoin de cruauté animale ?", link: "/Témoin de cruauté ?" },
        { text: "Nos compagnons adoptés", link: "/Nos compagnons adoptés" },
        { text: "Ce qu'il faut savoir", link: "/Ce qu'il faut savoir" }
      ]
    },
    {
      title: "Adoption",
      propositions: [
        { text: "Formulaire d'adoption", link: "/Formulaire d'adoption" },
        { text: "Conditions d'adoption", link: "/Conditions d'adoption" }
      ]
    },
    {
      title: "Membres",
      propositions: [
        { text: "Notre équipe", link: "/Notre équipe" },
        { text: "Adhésions", link: "/Adhésions" },
        { text: "Nos partenaires", link: "/Nos partenaires" }
      ]
    },
    { title: "Contact", link: "/Contact" }
  ];

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <div className="navbar_logo">
        <Link to="/">
          <img
            src="/img/logo_site.svg"
            alt="C'est le logo du refuge, il y a le nom du refuge et un chien et un chat collé ensemble en dessous"
            width={130}
          />
        </Link>
      </div>

      <ul className="navbar_links">
        {options.map((option, index) => (
          <li
            className="navbar_item"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className={`navbar_link ${showPopup === index ? "active" : ""}`}
              to={option.link || "#"}
            >
              {option.title}
            </Link>
            {showPopup === index && option.propositions && (
              <div className="popup">
                {option.propositions.map((prop, i) => (
                  <Link
                    key={i}
                    to={prop.link}
                    className="popup_item"
                    onClick={() => handleClickProposition(prop.text)}
                  >
                    {prop.text}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}

        <li className="navbar_item icon_navbar">
          <Link className="navbar_link" to="/Adhésions">
            <img
              src="/img/coeur_dons_modif3.png"
              alt="C'est l'icon pour faire un don en forme de coeur"
              width={45}
            />
          </Link>
        </li>

        <li className="navbar_item icon_navbar icon_profil">
          {/* LOGIQUE CLÉ : Utilise 'isAuthenticated' basé sur la présence de 'user' */}
          <Link className="navbar_link" to={isAuthenticated ? "/Mon compte" : "/Connexion"}>
            <img
              src="/img/svg_profil.svg"
              alt="C'est l'icon de connexion avec un petit profil"
              width={50}
            />
          </Link>
        </li>
      </ul>

      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
}

export default Navbar;