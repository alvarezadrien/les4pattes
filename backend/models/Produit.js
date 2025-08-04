const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    prix: String,
    image: String,
    espece: String,
    stock: { type: Number, default: 0 }, // Ajout du stock
    poids: String, // Ajout du poids
});

module.exports = mongoose.model("Produit", produitSchema);
