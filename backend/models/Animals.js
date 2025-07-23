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
    comportement: {
        type: [String],
        enum: ['calme', 'actif', 'affectueux', 'independant', 'sociable', 'joueur', 'curieux', 'calin'],
        default: []
    },
    ententeAvec: {
        type: [String],
        enum: ['enfants', 'chiens', 'chats', 'familles'],
        default: []
    },
    isRescue: { type: Boolean, default: false }
}, {
    timestamps: true
});

// ✅ Export simple et propre du modèle Mongoose
module.exports = mongoose.model('Animal', animalSchema);
