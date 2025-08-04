const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    prix: String,
    image: String,
    espece: String,
});

module.exports = mongoose.model("Produit", produitSchema);
