const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement

// Import des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour lire les JSON envoyés dans les requêtes

// Routes
app.use('/api/animaux', animalRoutes); // Ne pas toucher comme demandé
app.use('/api/auth', authRoutes);      // Authentification

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ MongoDB connecté');
        app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
    })
    .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));
