const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const animalRoutes = require('./routes/animalRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/animaux', animalRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connecté');
        app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
    })
    .catch((err) => console.error(err));
