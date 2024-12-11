const express = require('express');
const router = express.Router();
const { getAnimals, addAnimal } = require('../controllers/animalController');

// Route GET pour récupérer tous les animaux
router.get('/', getAnimals);

// Route POST pour ajouter un nouvel animal
router.post('/', addAnimal);

module.exports = router;
