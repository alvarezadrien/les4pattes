const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Obtenir les créneaux réservés pour une date donnée
router.get("/:date", async (req, res) => {
    try {
        const date = req.params.date; // ex: "2025-08-02"
        const reservations = await Reservation.find({ date });
        const creneauxReserves = reservations.map(r => r.creneau);
        res.json(creneauxReserves);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Ajouter une réservation
router.post("/", async (req, res) => {
    const { date, creneau, name, email, phone, message, reason } = req.body;

    // Vérifier si le créneau est déjà réservé
    const exists = await Reservation.findOne({ date, creneau });
    if (exists) {
        return res.status(400).json({ error: "Créneau déjà réservé" });
    }

    const reservation = new Reservation({ date, creneau, name, email, phone, message, reason });
    await reservation.save();
    res.status(201).json({ success: true });
});

module.exports = router;
