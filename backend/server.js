const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra'); // ✅ pour copier les images au démarrage

// ✅ Imports des routes
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const adoptionRequestRoutes = require('./routes/adoption_requestRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connexion MongoDB
const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI
        : process.env.LOCAL_MONGO_URI;

// ✅ Middlewares globaux
app.use(cors());
app.use(express.json());

// ✅ Sert les images uploadées (Chiens et Chats)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Sert les images publiques (par ex. avatars, pattes, default.jpg)
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// ✅ Log les requêtes aux images uploadées (debug)
app.use('/uploads', (req, res, next) => {
    console.log('🖼️ Image demandée :', req.originalUrl);
    next();
});

// ✅ Restauration d'images fixes si absentes (Render efface /uploads à chaque redémarrage)
function restoreImages() {
    const filesToRestore = [
        {
            from: path.join(__dirname, 'uploads_backup', 'Chats', '1753911283103-zero_image.png'),
            to: path.join(__dirname, 'uploads', 'Chats', '1753911283103-zero_image.png'),
        },
        // Tu peux en ajouter ici d’autres si besoin
    ];

    filesToRestore.forEach(({ from, to }) => {
        if (!fs.existsSync(to)) {
            try {
                fse.ensureDirSync(path.dirname(to));
                fse.copyFileSync(from, to);
                console.log(`✅ Image restaurée : ${to}`);
            } catch (err) {
                console.error(`❌ Erreur restauration ${to} :`, err.message);
            }
        }
    });
}
restoreImages();

// ✅ Routes
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/adoptionRequests', adoptionRequestRoutes);
app.use('/api/password', passwordRoutes);

// ✅ Connexion et lancement serveur
mongoose
    .connect(mongoURI)
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
