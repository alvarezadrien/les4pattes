import React from "react";
import '../Navbar/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Mon Site</h1>
      <ul className="navbar-links">
        <li><a href="/">Accueil</a></li>
        <li><a href="/about">À propos</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;