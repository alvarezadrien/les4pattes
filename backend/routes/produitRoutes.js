const express = require("express");
const router = express.Router();
const {
    getProduits,
    createProduit,
    updateProduit,
    deleteProduit,
} = require("../controllers/produitController");

router.get("/", getProduits);          // GET all
router.post("/", createProduit);       // POST new
router.put("/:id", updateProduit);     // PUT update
router.delete("/:id", deleteProduit);  // DELETE

module.exports = router;
