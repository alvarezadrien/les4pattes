const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Assurez-vous que le chemin vers votre modèle Comment est correct
const auth = require('../middleware/auth'); // Votre middleware d'authentification

// GET tous les commentaires (optionnel, pour debug ou admin)
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commentaires.", error });
    }
});

// GET commentaires d'un utilisateur spécifique
// Cette route doit être protégée pour s'assurer que seul l'utilisateur peut voir ses propres commentaires
router.get('/user/:userId', auth, async (req, res) => {
    try {
        // Vérifier si l'utilisateur connecté est bien celui dont on demande les commentaires
        if (req.auth.userId !== req.params.userId) {
            return res.status(403).json({ message: "Requête non autorisée." });
        }
        const comments = await Comment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commentaires de l'utilisateur.", error });
    }
});

// POST un nouveau commentaire
router.post('/', auth, async (req, res) => {
    const { commentText, rating } = req.body;
    const userId = req.auth.userId; // Récupéré depuis le token via le middleware auth
    const userName = req.auth.userName; // Supposons que votre middleware `auth` ajoute `userName` au `req.auth`

    if (!commentText || !rating || !userId || !userName) {
        return res.status(400).json({ message: "Données manquantes pour le commentaire." });
    }

    try {
        const newComment = new Comment({
            userId,
            userName,
            commentText,
            rating
        });
        await newComment.save();
        res.status(201).json({ message: "Commentaire ajouté avec succès !", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Échec de l'ajout du commentaire.", error });
    }
});

// DELETE un commentaire par son ID
// Seul l'utilisateur qui a créé le commentaire peut le supprimer
router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé." });
        }

        // Vérifier si l'utilisateur qui tente de supprimer le commentaire en est le propriétaire
        if (comment.userId.toString() !== req.auth.userId) {
            return res.status(403).json({ message: "Action non autorisée. Vous n'êtes pas le propriétaire de ce commentaire." });
        }

        await Comment.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Commentaire supprimé avec succès !" });
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        res.status(500).json({ message: "Échec de la suppression du commentaire.", error });
    }
});

module.exports = router;