import React from "react";

const Navbar = () => {
    return (
        <nav>
        <div class="logo-nav">
          <a href="home.html">
            <img
              src="../public/img/logo cafet.webp"
              alt=""
              width="100px"
              height="100px"
          /></a>

          <ul>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="#">À propos</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </nav>
    );
};
export default Navbar