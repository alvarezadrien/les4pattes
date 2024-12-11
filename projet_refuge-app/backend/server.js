const express = require('express');
const app = express();
const port = 5000;

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Définir une route simple pour tester
app.get('/', (req, res) => {
    res.send('Serveur Express fonctionne !');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
