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

// ✅ Récupérer tous les commentaires
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({}, '-__v').sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Récupérer les commentaires d'un utilisateur spécifique
router.get('/user/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const comments = await Comment.find({ userId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Supprimer un commentaire par son ID
router.delete('/:commentId', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé.' });
        }

        // 🔁 Correction ici : vérifie correctement que l'utilisateur est le propriétaire
        if (String(comment.userId) !== String(req.user.id)) {
            return res.status(403).json({ msg: 'Non autorisé à supprimer ce commentaire.' });
        }

        await comment.deleteOne();
        res.status(200).json({ msg: 'Commentaire supprimé.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
