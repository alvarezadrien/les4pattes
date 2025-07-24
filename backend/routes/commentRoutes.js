const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Ajouter un commentaire
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

// ✅ Récupérer tous les commentaires
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

// ✅ Récupérer un commentaire par ID
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

// ✅ Récupérer les commentaires d’un utilisateur spécifique
// GET /api/comments/user/:userId
router.get('/user/:userId', authMiddleware, async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// ✅ Modifier un commentaire
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

        // 🧹 Vérification supprimée volontairement ici
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

// ✅ Supprimer un commentaire (sans vérification de propriétaire)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        // ⚠️ Vérification supprimée → tout utilisateur connecté peut supprimer
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
