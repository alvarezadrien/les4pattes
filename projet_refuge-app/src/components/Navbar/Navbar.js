import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';
import PopupMenu from "../../Page/PopupMenu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-nav">
        <a href="/">
          <img className="logo"
            src="/img/logo_refuge.png"
            alt=""
            width="100px"
            height="100px"
          /></a>

        {/* <ul className="nav_ul">
          <li><a href="#">Animaux</a></li>
          <li><a href="#">Adoption</a></li>
          <li><a href="#">Membres</a></li>
          <li><a href="#">Contact</a></li>
        </ul> */}

        <PopupMenu />

        <div className="coeur_don">
          <img src="/img/coeurs.png" alt="" width={45} height={45} />
          {/* <h2 className="h_don">Faire un don</h2> */}
        </div>

        <div className="icon_connect">
          <img src="/img/profil.png" alt="" width={40} height={40} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;