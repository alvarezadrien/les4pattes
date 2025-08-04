const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    prix: String,
    image: String,
    espece: String, // "chien" ou "chat"
});

module.exports = mongoose.model("Produit", produitSchema);
