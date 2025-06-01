const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    race: { type: String },
    age: { type: Number },
    sexe: { type: String },
    description: { type: String },
    adopte: { type: Boolean, default: false },
    image: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);
