// backend/routes/creneauRoutes.js
const express = require("express");
const router = express.Router();
const Creneau = require("../models/Creneau");

// Ajouter un créneau disponible (depuis Insomnia/Postman)
router.post("/", async (req, res) => {
    try {
        const { date, heure } = req.body;
        const nouveau = new Creneau({ date, heure });
        await nouveau.save();
        res.status(201).json(nouveau);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l’ajout du créneau" });
    }
});

// Obtenir tous les créneaux
router.get("/", async (req, res) => {
    try {
        const liste = await Creneau.find();
        res.json(liste);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

// Obtenir les créneaux pour une date précise
router.get("/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const dispos = await Creneau.find({ date });
        const heures = dispos.map((c) => c.heure);
        res.json(heures);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
