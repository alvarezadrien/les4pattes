const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// 🖼️ Multer config pour avatar personnalisé
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, `avatar-${req.user?.id || Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const isValid = filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase());
        cb(isValid ? null : new Error('Seules les images JPEG, JPG, PNG, GIF sont autorisées'));
    }
});

// ✅ Inscription
router.post('/signup', async (req, res) => {
    const { nom, prenom, dateNaissance, adresse, telephone, email, password, avatar, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

        const newUser = new User({
            nom,
            prenom,
            dateNaissance,
            adresse: {
                rue: adresse?.rue || '',
                ville: adresse?.ville || '',
                codePostal: adresse?.codePostal || '',
                pays: adresse?.pays || ''
            },
            telephone,
            email,
            password,
            avatar: avatar || '/img/avatar.png',
            role: ['admin', 'user'].includes(role) ? role : 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'Inscription réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// ✅ Connexion
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
                avatar: user.avatar,
                adresse: user.adresse,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// ✅ Récupérer le profil connecté
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Erreur Serveur');
    }
});

// ✅ Modifier les données personnelles
router.put('/profile', auth, async (req, res) => {
    const { nom, prenom, email } = req.body;

    if (!prenom || !nom || !email) {
        return res.status(400).json({ msg: "Champs requis manquants." });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });

        // ✅ Ne pas bloquer si l'email est identique à l'utilisateur actuel
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            return res.status(400).json({ msg: "Cet email est déjà utilisé." });
        }

        user.nom = nom;
        user.prenom = prenom;
        user.email = email;

        await user.save();
        res.json({ msg: "Profil mis à jour avec succès.", user });
    } catch (err) {
        console.error("❌ Erreur lors de la mise à jour du profil:", err);
        res.status(500).json({ msg: "Erreur serveur lors de la mise à jour du profil." });
    }
});

// ✅ Mettre à jour l'adresse
router.put('/profile/address', auth, async (req, res) => {
    const { rue, ville, codePostal, pays } = req.body;

    if (!rue || !ville || !codePostal || !pays) {
        return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });

        user.adresse = { rue, ville, codePostal, pays };
        await user.save();

        res.json({ msg: "Adresse mise à jour avec succès", user });
    } catch (err) {
        res.status(500).json({ msg: "Erreur serveur lors de la mise à jour de l'adresse." });
    }
});

// ✅ Modifier mot de passe
router.put('/password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ msg: "Champs requis manquants." });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ msg: "Mot de passe actuel incorrect." });
        }

        user.password = newPassword;
        await user.save();

        res.json({ msg: "Mot de passe mis à jour avec succès." });
    } catch (err) {
        res.status(500).json({ msg: "Erreur serveur lors de la mise à jour du mot de passe." });
    }
});

// ✅ Upload avatar
router.post('/profile/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: 'Aucun fichier valide sélectionné.' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });

        if (user.avatar && user.avatar.startsWith('/uploads/')) {
            const oldAvatarPath = path.join(__dirname, '..', user.avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlink(oldAvatarPath, (err) => {
                    if (err) console.error("Erreur suppression avatar:", err);
                });
            }
        }

        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();
        res.json({ msg: 'Avatar mis à jour avec succès', avatar: user.avatar });
    } catch (err) {
        res.status(500).send("Erreur serveur lors de l'upload de l'avatar");
    }
});

// ✅ Choisir avatar prédéfini
router.put('/profile/avatar-url', auth, async (req, res) => {
    try {
        const { avatarUrl } = req.body;

        if (!avatarUrl || !avatarUrl.startsWith('/img/Avatar/')) {
            return res.status(400).json({ msg: "URL d'avatar non valide." });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });

        user.avatar = avatarUrl;
        await user.save();

        res.json({ msg: "Avatar mis à jour avec succès", avatarUrl: user.avatar });
    } catch (err) {
        res.status(500).json({ msg: "Erreur serveur lors de la mise à jour de l'avatar." });
    }
});

module.exports = router;
