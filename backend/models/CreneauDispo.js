// models/CreneauDispo.js
const mongoose = require("mongoose");

const creneauDispoSchema = new mongoose.Schema({
    date: { type: String, required: true },  // ex: "2025-08-10"
    heure: { type: String, required: true }  // ex: "10h00"
});

module.exports = mongoose.model("CreneauDispo", creneauDispoSchema);
