// src/controllers/authController.js
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { nom, prenom, dateNaissance, adresse, telephone, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

        const newUser = new User({
            nom,
            prenom,
            dateNaissance,
            adresse,
            telephone,
            email,
            password,
            avatar: '/img/avatar.png'
        });

        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

        res.status(200).json({
            message: 'Connexion réussie.',
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                dateNaissance: user.dateNaissance,
                adresse: user.adresse,
                telephone: user.telephone,
                avatar: user.avatar,
                quizResult: user.quizResult || ""
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
};

// ✅ Nouvelle route : mise à jour du résultat du quiz
exports.updateQuizResult = async (req, res) => {
    try {
        const userId = req.user.id; // récupéré depuis le middleware d'authentification
        const { quizResult } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { quizResult },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({
            message: 'Résultat du quiz mis à jour.',
            quizResult: updatedUser.quizResult
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du résultat', error: err.message });
    }
};
