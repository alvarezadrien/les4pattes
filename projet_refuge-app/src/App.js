import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  
import Home_Page from './components/Home/HomePage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/HomePage" element={<Home_Page />} />
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
