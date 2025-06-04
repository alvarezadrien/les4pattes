// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes'); // <<< NOUVEL IMPORT

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Utilisation des routes
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes); // <<< NOUVELLE ROUTE

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