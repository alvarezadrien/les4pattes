const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  prix: String,
  image: String,
  espece: String,
  categorie: {
    type: [String], 
    enum: [
      "chien",
      "chat",
      "humain",
      "jouet",
      "croquettes",
      "accessoires",
      "friandises",
      "goodies",
      "vêtements"
    ],
    required: true
  },
  stock: { type: Number, default: 0 },
  poids: String
});

module.exports = mongoose.model("Produit", produitSchema);
