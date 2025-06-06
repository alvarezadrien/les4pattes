const express = require('express');
const router = express.Router();
const Animal = require('../models/Animals'); // Assurez-vous que ce chemin vers votre modèle est correct

// GET tous les animaux avec filtres possibles (espece, sexe, taille, adopte, comportement, ententeAvec, dureeRefuge)
router.get('/', async (req, res) => {
    try {
        const { espece, sexe, taille, adopte, comportement, ententeAvec, dureeRefuge } = req.query;
        let filter = {}; // Objet qui contiendra les conditions de filtrage pour Mongoose

        if (espece) {
            filter.espece = espece;
        }
        if (sexe) {
            filter.sexe = sexe;
        }
        if (taille) {
            filter.taille = taille;
        }
        if (adopte !== undefined) {
            filter.adopte = adopte === 'true'; // Convertir la chaîne "true"/"false" en booléen
        }

        // --- Ajout des filtres spécifiques aux tableaux (comportement, ententeAvec) ---
        // Utilise l'opérateur $in pour trouver les documents où le tableau contient la valeur spécifiée
        if (comportement) {
            filter.comportement = { $in: [comportement] };
        }
        if (ententeAvec) {
            filter.ententeAvec = { $in: [ententeAvec] };
        }

        // --- Logique pour le filtre dureeRefuge (basée sur dateArrivee) ---
        if (dureeRefuge) {
            const now = new Date();
            let dateThresholdMin, dateThresholdMax;

            switch (dureeRefuge) {
                case '-1mois': // Moins d'un mois au refuge
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    filter.dateArrivee = { $gte: dateThresholdMin };
                    break;
                case '1-3mois': // Entre 1 et 3 mois au refuge
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax, $gte: dateThresholdMin };
                    break;
                case '3-6mois': // Entre 3 et 6 mois au refuge
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    dateThresholdMin = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax, $gte: dateThresholdMin };
                    break;
                case '+6mois': // Plus de 6 mois au refuge
                    dateThresholdMax = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    filter.dateArrivee = { $lte: dateThresholdMax };
                    break;
                default:
                    // Ne rien faire si la valeur de dureeRefuge n'est pas reconnue
                    break;
            }
        }
        // --- Fin de la logique dureeRefuge ---

        const animaux = await Animal.find(filter); // Exécute la requête Mongoose avec les filtres
        res.json(animaux); // Renvoie les animaux filtrés
    } catch (err) {
        console.error("Erreur lors de la récupération des animaux :", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des animaux.", error: err.message });
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
        if (!updated) return res.status(404).json({ message: "Animal non trouvé pour mise à jour" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE un animal
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