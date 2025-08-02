// models/Creneau.js
const mongoose = require("mongoose");

const creneauSchema = new mongoose.Schema(
    {
        date: { type: String, required: true }, // "YYYY-MM-DD"
        heure: { type: String, required: true }, // "HH:mm"
    },
    { timestamps: true }
);

module.exports = mongoose.model("Creneau", creneauSchema);
