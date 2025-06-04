// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Importe le modèle de commentaire
const authMiddleware = require('../middleware/authMiddleware'); // Supposons que tu as un middleware d'authentification

// @route   POST /api/comments
// @desc    Créer un nouveau commentaire
// @access  Private (requiert d'être connecté)
router.post('/', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;
    const userId = req.user.id; // L'ID de l'utilisateur est ajouté par le middleware d'authentification
    const username = req.user.username; // Le nom d'utilisateur est ajouté par le middleware d'authentification

    // Validation basique
    if (!commentText || !rating) {
        return res.status(400).json({ msg: 'Veuillez saisir un commentaire et une note.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'La note doit être entre 1 et 5.' });
    }

    try {
        const newComment = new Comment({
            userId,
            username, // On utilise le nom d'utilisateur récupéré du token
            commentText,
            rating
        });

        const comment = await newComment.save();
        res.status(201).json(comment); // 201 Created
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

router.get('/', async (req, res) => {
    try {
        // Optionnel: trier par date de création descendante
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;