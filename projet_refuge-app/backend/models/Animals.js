const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    race: { type: String, default: "" },
    age: { type: Number, min: 0 },
    sexe: { type: String, enum: ["Mâle", "Femelle", "Inconnu"], default: "Inconnu" },
    taille: { type: String, enum: ['petit', 'moyen', 'grand'], default: 'moyen' },
    description: { type: String, default: "" },
    descriptionAdoption: { type: String, default: "" },  // <-- Nouveau champ ajouté ici
    dateArrivee: { type: Date, default: Date.now },
    adopte: { type: Boolean, default: false },
    image: { type: String, default: "" },
    image2: { type: String, default: "" },
    image3: { type: String, default: "" },
    images: { type: [String], default: [] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);
