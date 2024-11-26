import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showPopup, setShowPopup] = useState(null);

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
        { text: "Témoin de cruauté animale ?", link: "/temoin de cruaute" },
        { text: "Nos compagnons adoptés", link: "/compagnons adoptés" }
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
        { text: "Notre équipe", link: "/notre équipe" },
        { text: "Adhésions", link: "/adhésions" },
        { text: "Nos partenaires", link: "/Nos partenaires" }
      ]
    },
    { title: "Contact", link: "/contact" }
  ];

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <div className="navbar_logo">
        <a href="/">
          <img
            src="/img/Logo_refuge.png"
            alt="C'est le logo du refuge, il y a le nom du refuge et un chien et un chat collé ensemble en dessous"
            width={150}
            height={95}
          />
        </a>
      </div>

      <ul className="navbar_links">
        {options.map((option, index) => (
          <li
            className="navbar_item"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              className="navbar_link"
              href={option.link || "#"}
            >
              {option.title}
            </a>
            {/* Popup affiché uniquement pour les propositions */}
            {showPopup === index && option.propositions && (
              <div className="popup">
                {option.propositions.map((prop, i) => (
                  <a
                    key={i}
                    href={prop.link}
                    className="popup_item"
                    onClick={() => handleClickProposition(prop.text)}
                  >
                    {prop.text}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}

        <li className="navbar_item icon_navbar">
          <a className="navbar_link" href="">
            <img
              src="/img/coeurs.png"
              alt="C'est l'icon pour faire un don en forme de coeur"
              width={40}
            />
          </a>
        </li>

        <li className="navbar_item icon_navbar icon_profil">
          <a className="navbar_link" href="/Connexion">
            <img
              src="/img/profil.png"
              alt="C'est l'icon de connexion avec un petit profil"
              width={40}
            />
          </a>
        </li>
      </ul>

      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
}

export default Navbar;
