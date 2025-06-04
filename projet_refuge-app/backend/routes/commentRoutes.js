// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Importe le modèle de commentaire
const authMiddleware = require('../middleware/authMiddleware'); // Supposons que tu as un middleware d'authentification

// ---
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

// ---
// @route   GET /api/comments
// @desc    Récupérer tous les commentaires
// @access  Public
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


// @route   GET /api/comments/:id
// @desc    Récupérer un commentaire spécifique par son ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        // Gérer le cas où l'ID n'est pas un ObjectId valide (MongoError)
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de commentaire invalide' });
        }
        res.status(500).send('Erreur serveur');
    }
});

// ---

// @route   PUT /api/comments/:id
// @desc    Mettre à jour un commentaire existant
// @access  Private (requiert d'être le propriétaire du commentaire)
router.put('/:id', authMiddleware, async (req, res) => {
    const { commentText, rating } = req.body;

    // Construire l'objet commentaireFields
    const commentFields = {};
    if (commentText) commentFields.commentText = commentText;
    if (rating) {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ msg: 'La note doit être entre 1 et 5.' });
        }
        commentFields.rating = rating;
    }
    commentFields.updatedAt = Date.now(); // Mettre à jour la date de modification

    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        // Vérifier si l'utilisateur est le propriétaire du commentaire
        // L'ID de l'utilisateur est un ObjectId, donc il faut le comparer avec .toString()
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé : vous n\'êtes pas le propriétaire de ce commentaire' });
        }

        // Mettre à jour le commentaire
        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: commentFields },
            { new: true } // Renvoie le document mis à jour
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

// ---
// @route   DELETE /api/comments/:id
// @desc    Supprimer un commentaire
// @access  Private (requiert d'être le propriétaire du commentaire ou un admin si tu en as un)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Commentaire non trouvé' });
        }

        // Vérifier si l'utilisateur est le propriétaire du commentaire
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé : vous n\'êtes pas le propriétaire de ce commentaire' });
        }

        await Comment.findByIdAndDelete(req.params.id); // Utilise findByIdAndDelete pour supprimer

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