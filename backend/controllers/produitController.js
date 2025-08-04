const Produit = require("../models/Produit");

exports.createProduit = async (req, res) => {
    try {
        const { nom, description, prix, image, espece } = req.body;
        const nouveauProduit = new Produit({ nom, description, prix, image, espece });
        const produitEnregistre = await nouveauProduit.save();
        res.status(201).json(produitEnregistre);
    } catch (error) {
        console.error("❌ Erreur création produit :", error.message);
        res.status(500).json({ message: "Erreur lors de la création du produit" });
    }
};

exports.getProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
