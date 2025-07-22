const express = require('express');
const router = express.Router();
const Animal = require('../models/Animals');

// ✅ Compte des non-adoptés
router.get('/count/non-adoptes', async (req, res) => {
    try {
        const count = await Animal.countDocuments({
            $or: [{ adopte: false }, { adopte: { $exists: false } }]
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors du comptage." });
    }
});

// ✅ GET tous les animaux avec filtres
router.get('/', async (req, res) => {
    try {
        const { espece, sexe, taille, adopte, comportement, ententeAvec, dureeRefuge } = req.query;
        let filter = {};

        if (espece) filter.espece = espece;
        if (sexe) filter.sexe = sexe;
        if (taille) filter.taille = taille;
        if (adopte !== undefined) filter.adopte = adopte === 'true';
        if (comportement) filter.comportement = { $in: [comportement] };
        if (ententeAvec) filter.ententeAvec = { $in: [ententeAvec] };

        if (dureeRefuge) {
            const now = new Date();
            let dateThresholdMin, dateThresholdMax;

            switch (dureeRefuge) {
                case '-1mois':
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    filter.dateArrivee = { $gte: dateThresholdMin };
                    break;
                case '1-3mois':
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax, $gte: dateThresholdMin };
                    break;
                case '3-6mois':
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax, $gte: dateThresholdMin };
                    break;
                case '+6mois':
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax };
                    break;
            }
        }

        const animaux = await Animal.find(filter);
        res.json(animaux);
    } catch (err) {
        console.error("Erreur lors de la récupération des animaux :", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des animaux.", error: err.message });
    }
});

// ✅ POST nouvel animal avec images dans /uploads/Chats
router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => `/uploads/Chats/${file.filename}`);

        const comportement = req.body['comportement[]'] ? [].concat(req.body['comportement[]']) : [];
        const ententeAvec = req.body['ententeAvec[]'] ? [].concat(req.body['ententeAvec[]']) : [];
        const isRescue = req.body.isRescue === 'true' || req.body.isRescue === true;

        const newAnimal = new Animal({
            ...req.body,
            images: imagePaths,
            comportement,
            ententeAvec,
            isRescue,
        });

        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (err) {
        console.error("Erreur lors de la création de l'animal :", err);
        res.status(400).json({ message: err.message });
    }
});

// ✅ GET par ID
router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: "Animal non trouvé" });
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ PUT mise à jour
router.put('/:id', async (req, res) => {
    try {
        const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Animal non trouvé pour mise à jour" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ DELETE un animal
router.delete('/:id', async (req, res) => {
    try {
        const result = await Animal.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Animal non trouvé pour suppression" });
        res.json({ message: 'Animal supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
