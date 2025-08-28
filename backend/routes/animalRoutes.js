const express = require('express');
const router = express.Router();
const Animal = require('../models/Animals');
const path = require('path');
const upload = require('../middleware/uploads');

// ✅ POST /api/animaux – Ajouter un animal avec images
router.post(
    '/',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const {
                nom,
                espece,
                race,
                age,
                sexe,
                taille,
                description,
                descriptionAdoption,
                dateArrivee,
                comportement,
                ententeAvec,
                isRescue
            } = req.body;

            const dossier = espece?.toLowerCase() === 'chat' ? 'Chats' : 'Chiens';
            const basePath = path.join('uploads', dossier);

            const images = [];
            if (req.files.image1) images.push(path.join(basePath, req.files.image1[0].filename));
            if (req.files.image2) images.push(path.join(basePath, req.files.image2[0].filename));
            if (req.files.image3) images.push(path.join(basePath, req.files.image3[0].filename));

            const newAnimal = new Animal({
                nom,
                espece,
                race,
                age: Number(age),
                sexe,
                taille,
                description,
                descriptionAdoption,
                dateArrivee,
                comportement: comportement ? JSON.parse(comportement) : [],
                ententeAvec: ententeAvec ? JSON.parse(ententeAvec) : [],
                isRescue: isRescue === 'true' || isRescue === true,
                images,
                image: images[0] || '',
                image2: images[1] || '',
                image3: images[2] || ''
            });

            await newAnimal.save();
            res.status(201).json({ message: 'Animal ajouté avec succès', animal: newAnimal });
        } catch (error) {
            console.error('❌ Erreur lors de l\'ajout de l\'animal :', error);
            res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de l\'animal', error: error.message });
        }
    }
);

// ✅ GET /api/animaux/count/non-adoptes
router.get('/count/non-adoptes', async (req, res) => {
    try {
        const count = await Animal.countDocuments({
            $or: [{ adopte: false }, { adopte: { $exists: false } }]
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors du comptage.' });
    }
});

// ✅ GET /api/animaux (avec filtres)
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
        console.error('Erreur lors de la récupération des animaux :', err);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des animaux.', error: err.message });
    }
});

// ✅ GET par ID
router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal non trouvé' });
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ PUT mise à jour
router.put('/:id', async (req, res) => {
    try {
        const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Animal non trouvé pour mise à jour' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ PATCH statut adopté
router.patch('/:id/status', async (req, res) => {
    try {
        const { adopte } = req.body;
        const animal = await Animal.findByIdAndUpdate(req.params.id, { adopte }, { new: true });
        if (!animal) return res.status(404).json({ message: 'Animal non trouvé' });
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ DELETE un animal
router.delete('/:id', async (req, res) => {
    try {
        const result = await Animal.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Animal non trouvé pour suppression' });
        res.json({ message: 'Animal supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
