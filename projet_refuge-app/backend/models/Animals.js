const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    race: { type: String, default: "" },
    age: { type: Number, min: 0 },
    sexe: { type: String, enum: ["Mâle", "Femelle", "Inconnu"], default: "Inconnu" },
    taille: { type: String, enum: ['petit', 'moyen', 'grand'], default: 'moyen' },
    description: { type: String, default: "" },
    descriptionAdoption: { type: String, default: "" },
    dateArrivee: { type: Date, default: Date.now },
    adopte: { type: Boolean, default: false },
    image: { type: String, default: "" },
    image2: { type: String, default: "" },
    image3: { type: String, default: "" },
    images: { type: [String], default: [] },
    // --- Nouveaux champs pour les filtres ---
    comportement: {
        type: [String], // Permet de stocker plusieurs comportements (ex: ['calme', 'affectueux'])
        enum: ['calme', 'actif', 'affectueux', 'independant', 'sociable', 'joueur', 'curieux', 'calin'],
        default: []
    },
    ententeAvec: {
        type: [String], // Permet de stocker plusieurs ententes (ex: ['enfants', 'chiens'])
        enum: ['enfants', 'chiens', 'chats', 'familles'], // 'familles' si c'est une catégorie d'entente
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);