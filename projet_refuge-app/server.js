const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.log('Erreur de connexion à MongoDB:', error));

// Importer la route d'inscription
const registerRoute = require('./routes/register');
app.use('/api', registerRoute);

app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
