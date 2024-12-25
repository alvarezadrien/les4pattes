import React from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './Page/HomePage';
import Apropos from './Page/Apropos';
import Galeriechien from './Page/Galeriechien';
import Galeriechat from './Page/Galeriechat';
import Contact from './Page/Contact';
import Equipe from './Page/Equipe';
import Ficheperso_animal from './Page/Ficheperso_animal';
import Partenaires from './Page/Partenaires';
import Connexion from './Page/Connexion';
import Motpasse_oublie from './Page/Motpasse_oublie';
import Inscription from './Page/Inscription';
import Adoption from './Page/Adoption';
import Conditions_adoption from './Page/Conditions_adoption';
import Savoir from './Page/Savoir';
import Cruaute from './Page/Cruaute';
import Compagnons_adopter from './Page/Compagnons_adopter';
import Mon_compte from './Page/Mon_compte';
import Accueil_animaux from './Page/Accueil_animaux';
import Sensibilisation from './Page/Sensibilisation';
import Adhesions from './Page/Adhesions';

// Code réutilisable
import Animalitem from './Page/Animalitem';
import PopupMenu from './Page/PopupMenu';
import Filtre from './Page/Filtre';
import Pagination from './Page/Pagination';
import Carte_carrousel from './Page/Carte_carrousel';
import Scroll_button from './Page/Scroll_button';

const App = () => {
  // Vérifie si la page actuelle est une des pages à exclure (Connexion, Inscription, Mot de passe oublié)
  const noNavbarFooter = ["/Connexion", "/Inscription", "/Mot de passe oublié"].includes(window.location.pathname);

  return (
    <Router>
      {/* Exclure Navbar et Footer sur les pages spécifiées */}
      {!noNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/Galeriechien" element={<Galeriechien />} />
        <Route path='/Galeriechat' element={<Galeriechat />} />
        <Route path='/Nos partenaires' element={<Partenaires />} />
        <Route path='/Ficheperso_animal' element={<Ficheperso_animal />} />
        <Route path="/Animalitem" element={<Animalitem />} />
        <Route path="/Notre équipe" element={<Equipe />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Mot de passe oublié" element={<Motpasse_oublie />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Formulaire d'adoption" element={<Adoption />} />
        <Route path="/Conditions d'adoption" element={<Conditions_adoption />} />
        <Route path="/Se qu'il faut savoir" element={<Savoir />} />
        <Route path="/Témoin de cruauté ?" element={<Cruaute />} />
        <Route path="/Carte" element={<Carte_carrousel />} />
        <Route path="/Nos compagnons adoptés" element={<Compagnons_adopter />} />
        <Route path="/Mon compte" element={<Mon_compte />} />
        <Route path="/L'accueil des animaux" element={<Accueil_animaux />} />
        <Route path="/Sensibilisation" element={<Sensibilisation />} />
        <Route path="/Adhésions" element={<Adhesions />} />
      </Routes>
      <Scroll_button />
      {/* Exclure Footer sur les pages spécifiées */}
      {!noNavbarFooter && <Footer />}
    </Router>
  );
};

export default App;
