const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement
const path = require('path'); // <<< NOUVEL IMPORT : pour gérer les chemins de fichiers

// Import des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour lire les JSON envoyés dans les requêtes

// --- NOUVELLE PARTIE : Servir les fichiers statiques ---
// Cela rendra les fichiers du dossier 'uploads' accessibles via l'URL /uploads
// Par exemple, si une image est dans backend/uploads/mon_avatar.png,
// elle sera accessible depuis le frontend via http://localhost:5000/uploads/mon_avatar.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Si tes images statiques "design" (comme les /img/Avatar/avatar_chat1.jpg)
// sont dans un dossier "public" à la racine de ton backend, tu devrais aussi le servir :
// app.use('/img', express.static(path.join(__dirname, 'public/img')));
// Je laisse cette ligne commentée pour l'instant car je ne sais pas où sont tes images statiques du design.
// Si elles sont côté frontend uniquement, pas besoin de cette ligne ici.
// --------------------------------------------------------

// Routes
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);

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