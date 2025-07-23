const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// ✅ Imports des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const adoptionRequestRoutes = require('./routes/adoption_requestRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connexion à la base de données
const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI
        : process.env.LOCAL_MONGO_URI;

// ✅ Middlewares globaux
app.use(cors());
app.use(express.json());

// ✅ Sert les images uploadées (chiens, chats, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Sert les avatars prédéfinis du dossier public/img
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// ✅ Log en console les accès aux images pour debugging (facultatif mais utile)
app.use('/uploads', (req, res, next) => {
    console.log('🖼️ Image demandée :', req.originalUrl);
    next();
});

// ✅ Définition des routes API
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/adoptionRequests', adoptionRequestRoutes);
app.use('/api/password', passwordRoutes);

// ✅ Connexion MongoDB et lancement du serveur
mongoose.connect(mongoURI)
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
