const express = require("express");
const router = express.Router();
const { getProduits, createProduit } = require("../controllers/produitController");

router.get("/", getProduits);
router.post("/", createProduit); // ✅ POST pour Insomnia

module.exports = router;
