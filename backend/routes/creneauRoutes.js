const express = require("express");
const router = express.Router();
const Creneau = require("../models/Creneau");

// Obtenir tous les créneaux possibles
router.get("/", async (req, res) => {
    try {
        const creneaux = await Creneau.find();
        res.json(creneaux);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Ajouter un nouveau créneau (depuis Insomnia)
router.post("/", async (req, res) => {
    try {
        const { heure } = req.body;
        const exists = await Creneau.findOne({ heure });
        if (exists) return res.status(400).json({ error: "Ce créneau existe déjà." });

        const creneau = new Creneau({ heure });
        await creneau.save();
        res.status(201).json({ success: true, creneau });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'ajout du créneau" });
    }
});

module.exports = router;
