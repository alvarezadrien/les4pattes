const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin'); // ✅ Ajout du middleware admin
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// --- Multer config pour avatar ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const isValid = filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase());
        cb(isValid ? null : 'Erreur : Seules les images (JPEG, JPG, PNG, GIF) sont autorisées !', isValid);
    }
});

// 🧾 Inscription
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

// 🔐 Connexion
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
                avatarUrl: user.avatarUrl,
                role: user.role // Ajouté pour gérer le rôle côté frontend
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// 👤 Récupération du profil connecté
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur');
    }
});

// 🖼️ Mise à jour avatar
router.post('/profile/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'Aucun fichier valide sélectionné.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });

        // Supprimer l'ancien avatar si ce n'est pas le défaut
        if (user.avatarUrl && user.avatarUrl !== '/uploads/default_avatar.png') {
            const oldAvatarPath = path.join(__dirname, '..', user.avatarUrl);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlink(oldAvatarPath, (err) => {
                    if (err) console.error("Erreur suppression avatar:", err);
                });
            }
        }

        user.avatarUrl = `/uploads/${req.file.filename}`;
        await user.save();
        res.json({ msg: 'Avatar mis à jour avec succès', avatarUrl: user.avatarUrl });

    } catch (err) {
        console.error(err);
        if (err instanceof multer.MulterError || (err.message && err.message.includes('Erreur'))) {
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).send("Erreur serveur lors de l'upload de l'avatar");
    }
});

// 👥 Admin : voir tous les utilisateurs
router.get('/users', auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// ❌ Admin : supprimer un utilisateur
router.delete('/users/:id', auth, isAdmin, async (req, res) => {
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
