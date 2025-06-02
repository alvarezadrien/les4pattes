const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    race: { type: String, default: "" },
    age: { type: Number, min: 0 },
    sexe: { type: String, enum: ["Mâle", "Femelle", "Inconnu"], default: "Inconnu" },
    taille: { type: String, enum: ['petit', 'moyen', 'grand'], default: 'moyen' },
    description: { type: String, default: "" },
    dateArrivee: { type: Date, default: Date.now }, // Date d'arrivée de l'animal
    adopte: { type: Boolean, default: false },
    image: { type: String, default: "" },    // Image principale
    image2: { type: String, default: "" },   // Image secondaire 1
    image3: { type: String, default: "" },   // Image secondaire 2
    images: { type: [String], default: [] } // Tableau d'images supplémentaires (optionnel)
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);
