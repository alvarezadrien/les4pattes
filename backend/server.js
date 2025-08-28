const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const adoptionRequestRoutes = require('./routes/adoption_requestRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const donationRoutes = require('./routes/donationRoutes');
const stripePanierRoutes = require('./routes/stripePanierRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const creneauRoutes = require('./routes/creneauRoutes');
const creneauDispoRoutes = require('./routes/creneauDispoRoutes');
const produitRoutes = require('./routes/produitRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI
        : process.env.LOCAL_MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Middleware pour servir des images locales si besoin (optionnel)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serveur des images publiques (ex: frontend)
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Routes API
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/adoptionRequests', adoptionRequestRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api', stripePanierRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/creneaux', creneauRoutes);
app.use('/api/creneaux-dispo', creneauDispoRoutes);
app.use('/api/produits', produitRoutes);

// Middleware global pour erreurs
app.use((err, req, res, next) => {
    console.error('❌ Middleware erreur:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

// Connexion à MongoDB
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connexion à MongoDB réussie');
        app.listen(PORT, () => {
            console.log(`🚀 Serveur lancé sur le port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Échec de connexion à MongoDB :', err.message);
        process.exit(1);
    });
