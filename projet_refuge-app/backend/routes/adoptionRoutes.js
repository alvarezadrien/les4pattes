// routes/adoptionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Votre middleware d'authentification
// const AdoptionForm = require('../models/AdoptionForm'); // Vous devrez créer ce modèle Mongoose

// Route pour soumettre un formulaire d'adoption
// Nécessite que l'utilisateur soit authentifié
router.post('/', auth, async (req, res) => {
    try {
        const { motivation, logementType, hasJardin /* ... autres champs */ } = req.body;

        // Récupérer l'ID de l'utilisateur à partir du token (défini par le middleware 'auth')
        const userId = req.user.id;

        // Valider les données (basique)
        if (!motivation || !logementType) {
            return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
        }

        // Créer une nouvelle entrée de formulaire d'adoption dans la base de données
        // const newAdoption = new AdoptionForm({
        //     userId,
        //     motivation,
        //     logementType,
        //     hasJardin,
        //     // ... sauvegardez tous les champs
        // });
        // await newAdoption.save();

        res.status(201).json({ message: 'Formulaire d\'adoption soumis avec succès !', userId });
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire d\'adoption:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la soumission du formulaire.', error: error.message });
    }
});

module.exports = router;