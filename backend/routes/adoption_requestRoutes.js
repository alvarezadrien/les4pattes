const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AdoptionRequest = require('../models/AdoptionRequests');

// Middleware très basique de vérification (à adapter selon ton projet)
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Non autorisé : token manquant' });
    }

    // Tu peux ici ajouter une vraie vérification de JWT avec jsonwebtoken si besoin
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token invalide' });
    }

    // ⚠️ Ici on suppose que le frontend fournit user._id dans la requête POST
    next();
};

// POST – Créer une demande d'adoption
router.post('/', authenticateUser, async (req, res) => {
    try {
        const { user, animalId, formdata } = req.body;

        if (!animalId || !formdata) {
            return res.status(400).json({ message: 'Champs requis manquants' });
        }

        const newRequest = new AdoptionRequest({
            user: user || null, // facultatif si tu ne veux pas stocker l'ID utilisateur
            animal: animalId,
            formdata,
            status: 'Pending',
            messages: [
                {
                    sender: 'user',
                    text: formdata.message || '',
                },
            ],
        });

        const saved = await newRequest.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('[ERREUR ADOPTION REQUEST]', err);
        res.status(500).json({ message: 'Erreur lors de la création de la demande' });
    }
});

module.exports = router;
