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
const donationRoutes = require('./routes/donationRoutes'); // ✅ Route Stripe

const app = express();

// ✅ Middlewares globaux
app.use(cors());
app.use(express.json());

// ✅ Sert les images uploadées (Chiens et Chats)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Sert les images publiques (avatars, logo, pattes, etc.)
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// ✅ Log debug des images uploadées
app.use('/uploads', (req, res, next) => {
    console.log('🖼️ Image demandée :', req.originalUrl);
    next();
});

// ✅ Enregistrement des routes API
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/adoptionRequests', adoptionRequestRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/donation', donationRoutes); // ✅ Route Stripe ajoutée

// ✅ Connexion MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connexion à MongoDB réussie');
        // ✅ Démarrer le serveur UNIQUEMENT après connexion réussie
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Serveur lancé sur le port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Échec de connexion à MongoDB :', err.message);
        process.exit(1);
    });
