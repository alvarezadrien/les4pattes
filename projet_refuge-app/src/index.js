import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Importations des styles de react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fraimwork
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

