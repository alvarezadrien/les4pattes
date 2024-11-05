import React from "react";

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import './index.css';



function App() {
  return (
    <nav className="navbar">
      <div className="logo-nav">
        <a href="home.html">
          <img
            src="../public/img/logo cafet.webp"
            alt=""
            width="100px"
            height="100px"
          /></a>

        <ul className="nav_ul">
          <li><a href="#">Refuge</a></li>
          <li><a href="#">Animaux</a></li>
          <li><a href="#">Adoption</a></li>
          <li><a href="#">Membres</a></li>

        </ul>
      </div>
    </nav>
  );
};

export default App;