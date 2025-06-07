// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes'); // <<< NOUVEL IMPORT : Routes pour les formulaires d'adoption
const adoptionRequestRoutes = require('./routes/adoption_requestRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/adoptionRequests', adoptionRequestRoutes);

// Utilisation des routes
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/adoptions', adoptionRoutes); // <<< NOUVELLE ROUTE : Assurez-vous que vous avez un fichier adoptionRoutes.js

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