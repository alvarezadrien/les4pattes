import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Form } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './Page/HomePage';
import Apropos from './Page/Apropos';
import Galeriechien from './Page/Galeriechien';
import Galeriechat from './Page/Galeriechat';

// Code réutilisable
import Animalitem from './Page/Animalitem';
import PopupMenu from './Page/PopupMenu';
import Filtre from './Page/Filtre';
import Pagination from './Page/Pagination';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/Galeriechien" element={<Galeriechien />} />
          <Route path='/Galeriechat' element={<Galeriechat />} />
          <Route path="/Animalitem" element={<Animalitem />} />
          <Route path="/PopupMenu" element={<PopupMenu />} />
          <Route path="/Filtre" element={<Filtre />} />
          <Route path="/Pagination" element={<Pagination />} />
          <Route path="/animaux" element={<div>Animaux Page</div>} />
          <Route path="/adoption" element={<div>Adoption Page</div>} />
          <Route path="/membres" element={<div>Membres Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
