const Produit = require("../models/Produit");

// GET /api/produits
exports.getProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// POST /api/produits
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

// PUT /api/produits/:id
exports.updateProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const produitMisAJour = await Produit.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!produitMisAJour) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(produitMisAJour);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
    }
};

// DELETE /api/produits/:id
exports.deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Produit.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
};
