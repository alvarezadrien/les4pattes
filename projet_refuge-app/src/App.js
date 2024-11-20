import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Form } from 'react-router-dom';
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

// Code réutilisable
import Animalitem from './Page/Animalitem';
import PopupMenu from './Page/PopupMenu';
import Filtre from './Page/Filtre';
import Pagination from './Page/Pagination';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/Galeriechien" element={<Galeriechien />} />
        <Route path='/Galeriechat' element={<Galeriechat />} />
        <Route path='/Nos partenaires' element={<Partenaires />} />
        <Route path='/Ficheperso_animal' element={<Ficheperso_animal />} />
        <Route path="/Animalitem" element={<Animalitem />} />
        <Route path="/Notre equipe" element={<Equipe />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
