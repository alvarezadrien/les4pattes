const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware pour analyser les requêtes POST (JSON)
app.use(express.json());

// Connexion à la base de données
connectDB();

// Exemple de route
app.get('/', (req, res) => {
    res.send('API du refuge 4 pattes est opérationnelle !');
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
