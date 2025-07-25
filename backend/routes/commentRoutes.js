const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Ajouter un commentaire (avec avatar et nom complet)
router.post('/', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;

    const userId = req.user.id;
    const username = `${req.user.prenom} ${req.user.nom}`.trim() || "Utilisateur";
    const avatar = req.user.avatar || ''; // ✅ avatar attaché via authMiddleware

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
            avatar, // ✅ avatar enregistré dans le commentaire
            commentText: commentText.trim(),
            rating
        });

        const saved = await newComment.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Erreur création commentaire :', err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Récupérer tous les commentaires
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error('Erreur récupération commentaires :', err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Récupérer les commentaires d’un utilisateur
router.get('/user/:userId', authMiddleware, async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error('Erreur récupération commentaires utilisateur :', err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Supprimer un commentaire
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Non autorisé à supprimer ce commentaire' });
        }

        await comment.deleteOne();
        res.json({ msg: 'Commentaire supprimé avec succès' });
    } catch (err) {
        console.error('Erreur suppression commentaire :', err.message);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
