import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';
import PopupMenu from "../../Page/PopupMenu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container_navbar">
          <div className="logo-nav">
            <a href="/">
              <img className="logo"
                src="/img/logo_refuge.png"
                alt=""
                width="100px"
                height="100px"
              /></a>

            <PopupMenu />
          </div>
          <div className="icon_navbar">
            <div className="coeur_don">
              <img src="/img/coeurs.png" alt="" width={45} height={45} />
            </div>

            <div className="icon_connect">
              <img src="/img/profil.png" alt="" width={40} height={40} />
            </div>
          </div>
        </div>
    </nav >
  );
};

export default Navbar;