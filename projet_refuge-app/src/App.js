import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './Page/HomePage';
import Apropos from './Page/Apropos';
import Animalitem from './Page/Animalitem';
import PopupMenu from './Page/PopupMenu';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/Animalitem" element={<Animalitem />} />
          <Route path="/PopupMenu" element={<PopupMenu />} />
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
