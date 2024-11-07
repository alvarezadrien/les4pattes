import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Home/HomePage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Assure-toi que ton Navbar est présent sur toutes les pages */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Page d'accueil */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/refuge" element={<div>Refuge Page</div>} />
          <Route path="/animaux" element={<div>Animaux Page</div>} />
          <Route path="/adoption" element={<div>Adoption Page</div>} />
          <Route path="/membres" element={<div>Membres Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
