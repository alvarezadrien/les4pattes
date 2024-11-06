import React from "react";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from './components/Navbar/Navbar'
// import Home from './components/Home'
// import Footer from './components/Footer'
// import './index.css';



function App() {
  return (
    <router>
        <div>
          <routes>
              <route path="/Navabar" element={<Navbar />}/>
          </routes>
        </div>
    </router>
  );
};

export default App;