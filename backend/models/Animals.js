const express = require('express');
const router = express.Router();
const Animal = require('../models/Animals');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 Multer : configuration pour stockage des images dans /uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // max 3 Mo
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        cb(mimetype && extname ? null : new Error('Seules les images JPEG/JPG/PNG sont autorisées.'));
    }
});

// ✅ Compter les non-adoptés
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
            let min, max;
            switch (dureeRefuge) {
                case '-1mois':
                    min = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    filter.dateArrivee = { $gte: min };
                    break;
                case '1-3mois':
                    max = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    min = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    filter.dateArrivee = { $lte: max, $gte: min };
                    break;
                case '3-6mois':
                    max = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    min = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: max, $gte: min };
                    break;
                case '+6mois':
                    max = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: max };
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

// ✅ POST - Ajouter un animal avec images (image, image2, image3)
router.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), async (req, res) => {
    try {
        const { nom, espece, race, age, sexe, taille, description, descriptionAdoption, comportement, ententeAvec, isRescue } = req.body;

        const newAnimal = new Animal({
            nom,
            espece,
            race,
            age,
            sexe,
            taille,
            description,
            descriptionAdoption,
            comportement: comportement ? [].concat(comportement) : [],
            ententeAvec: ententeAvec ? [].concat(ententeAvec) : [],
            isRescue: isRescue === 'true'
        });

        if (req.files.image) newAnimal.image = `/uploads/${req.files.image[0].filename}`;
        if (req.files.image2) newAnimal.image2 = `/uploads/${req.files.image2[0].filename}`;
        if (req.files.image3) newAnimal.image3 = `/uploads/${req.files.image3[0].filename}`;

        await newAnimal.save();
        res.status(201).json({ message: "Animal ajouté avec succès", animal: newAnimal });
    } catch (err) {
        console.error("❌ Erreur ajout animal :", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
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
