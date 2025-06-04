// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assure-toi que le chemin est correct
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware'); // Ton middleware d'authentification
const multer = require('multer'); // Pour la gestion des fichiers
const path = require('path'); // Pour les chemins de fichiers
const fs = require('fs'); // Pour la suppression de fichiers (ancien avatar)

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// --- Configuration de Multer pour le téléversement d'avatar ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Le dossier 'uploads/' doit exister à la racine de ton backend (là où server.js est)
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Nom de fichier unique pour éviter les conflits
        cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite la taille de fichier à 2MB
    fileFilter: (req, file, cb) => {
        // Valide les types de fichiers (images uniquement)
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Erreur : Seules les images (JPEG, JPG, PNG, GIF) sont autorisées !');
        }
    }
});

router.post('/signup', async (req, res) => {
    const { nom, prenom, dateNaissance, adresse, telephone, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

        const newUser = new User({ nom, prenom, dateNaissance, adresse, telephone, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Inscription réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// Route connexion (ajustée pour renvoyer avatarUrl)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                avatarUrl: user.avatarUrl // Renvoie maintenant le champ avatarUrl mis à jour
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


router.get('/profile', auth, async (req, res) => { // Protégé par le middleware 'auth'
    try {
        // req.user.id est défini par ton middleware d'authentification
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }
        res.json(user); // Cette réponse doit contenir toutes les données du user (nom, prenom, email, avatarUrl, etc.)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur');
    }
});

// NOUVELLE ROUTE : Téléverser et mettre à jour l'avatar de l'utilisateur
// @route   POST /api/auth/profile/avatar
// @desc    Téléverser et mettre à jour l'avatar de l'utilisateur
// @access  Private (nécessite un token JWT)
router.post('/profile/avatar', auth, upload.single('avatar'), async (req, res) => { // Protégé par 'auth'
    try {
        if (!req.file) {
            // Multer renvoie une erreur si le fichier n'est pas bon ou absent
            return res.status(400).json({ msg: 'Aucun fichier sélectionné ou le fichier n\'est pas une image valide (max 2MB).' });
        }

        const user = await User.findById(req.user.id); // L'ID de l'utilisateur connecté
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }

        // Si l'utilisateur avait déjà un avatar et que ce n'était pas l'avatar par défaut
        // tenter de supprimer l'ancien fichier pour ne pas accumuler les images inutiles.
        if (user.avatarUrl && user.avatarUrl !== '/uploads/default_avatar.png') {
            const oldAvatarAbsolutePath = path.join(__dirname, '..', user.avatarUrl); // Chemin absolu de l'ancien avatar

            // Vérifier si le fichier existe avant de tenter de le supprimer
            if (fs.existsSync(oldAvatarAbsolutePath)) {
                fs.unlink(oldAvatarAbsolutePath, (err) => {
                    if (err) console.error("Erreur lors de la suppression de l'ancien avatar:", err);
                });
            }
        }

        // L'URL de l'avatar sera le chemin relatif au dossier uploads/
        // Ex: /uploads/avatar-65d4f2g3h4j5k6l7m8n9o0p1-1678901234567.png
        user.avatarUrl = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({ msg: 'Avatar mis à jour avec succès', avatarUrl: user.avatarUrl });

    } catch (err) {
        console.error(err);
        // Gérer spécifiquement les erreurs de Multer (ex: taille de fichier, type de fichier)
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: err.message });
        } else if (err.message && err.message.includes('Erreur : Seules les images')) { // Pour l'erreur personnalisée dans fileFilter
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).send('Erreur Serveur lors du téléversement de l\'avatar');
    }
});



router.get('/users', async (req, res) => { // Cette route devrait être protégée pour les administrateurs
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => { // Cette route devrait être protégée pour les administrateurs
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;