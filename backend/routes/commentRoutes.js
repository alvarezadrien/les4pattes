const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/comments
router.post('/', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;
    const userId = req.user.id;
    const username = req.user.prenom || req.user.nom || "Utilisateur";

    if (!commentText || !rating) {
        return res.status(400).json({ msg: 'Veuillez saisir un commentaire et une note.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'La note doit être entre 1 et 5.' });
    }

    try {
        const newComment = new Comment({
            userId,
            username,
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

// GET /api/comments/user/:userId ✅ Ajoutée
router.get('/user/:userId', authMiddleware, async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// GET /api/comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// GET /api/comments/:id
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de commentaire invalide' });
        }
        res.status(500).send('Erreur serveur');
    }
});

// PUT /api/comments/:id
router.put('/:id', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;
    const commentFields = {};
    if (commentText) commentFields.commentText = commentText;
    if (rating) {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ msg: 'La note doit être entre 1 et 5.' });
        }
        commentFields.rating = rating;
    }
    commentFields.updatedAt = Date.now();

    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé : vous n\'êtes pas le propriétaire de ce commentaire' });
        }

        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: commentFields },
            { new: true }
        );

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de commentaire invalide' });
        }
        res.status(500).send('Erreur serveur');
    }
});

// DELETE /api/comments/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé : vous n\'êtes pas le propriétaire de ce commentaire' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Commentaire supprimé avec succès' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de commentaire invalide' });
        }
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
