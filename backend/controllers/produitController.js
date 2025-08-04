const Produit = require("../models/Produit");

exports.getProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error.message);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des produits." });
    }
};
