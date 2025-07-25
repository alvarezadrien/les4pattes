const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Ajouter un commentaire
router.post('/', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;
    const { id: userId, prenom, nom, avatar } = req.user;
    const username = prenom || nom || "Utilisateur";

    if (!commentText || !rating) {
        return res.status(400).json({ msg: 'Veuillez saisir un commentaire et une note.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'La note doit être entre 1 et 5.' });
    }

    try {
        const existing = await Comment.findOne({ userId, commentText: commentText.trim() });
        if (existing) {
            return res.status(400).json({ msg: 'Vous avez déjà soumis ce commentaire.' });
        }

        const newComment = new Comment({
            userId,
            username,
            avatar,
            commentText,
            rating
        });

        const comment = await newComment.save();
        res.status(201).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Récupérer tous les commentaires avec userId
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({}, '-__v').sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
