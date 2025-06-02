const express = require('express');
const router = express.Router();
const Animal = require('../models/Animals');

// GET tous les animaux avec filtres possibles (espece, sexe, taille)
router.get('/', async (req, res) => {
    try {
        const { espece, sexe, taille } = req.query;
        let filter = {};

        if (espece) {
            filter.espece = espece;
        }
        if (sexe) {
            filter.sexe = sexe;
        }
        if (taille) {
            filter.taille = taille;  // Assure-toi que "taille" est bien dans le modèle
        }

        const animaux = await Animal.find(filter);
        res.json(animaux);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST un nouvel animal
router.post('/', async (req, res) => {
    const newAnimal = new Animal(req.body);
    try {
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET un animal par ID
router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: "Animal non trouvé" });
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT mise à jour d’un animal
router.put('/:id', async (req, res) => {
    try {
        const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE un animal
router.delete('/:id', async (req, res) => {
    try {
        await Animal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Animal supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
