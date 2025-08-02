// routes/creneauDispoRoutes.js
const express = require("express");
const router = express.Router();
const CreneauDispo = require("../models/CreneauDispo");

// Créer un créneau disponible (date + heure)
router.post("/", async (req, res) => {
    try {
        const { date, heure } = req.body;

        // Vérifie si ce créneau existe déjà
        const exists = await CreneauDispo.findOne({ date, heure });
        if (exists) {
            return res.status(400).json({ error: "Ce créneau est déjà enregistré comme disponible." });
        }

        const newCreneau = new CreneauDispo({ date, heure });
        await newCreneau.save();
        res.status(201).json({ success: true, message: "Créneau disponible ajouté." });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Obtenir tous les créneaux disponibles
router.get("/", async (req, res) => {
    try {
        const creneaux = await CreneauDispo.find();
        res.json(creneaux);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
