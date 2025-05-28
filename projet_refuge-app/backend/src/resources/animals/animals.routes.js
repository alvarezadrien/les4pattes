import express from 'express';
import * as animalController from './animals.controller.js'; // là où tu mets ta logique métier

const router = express.Router();

router.post('/', animalController.createAnimal);
router.get('/', animalController.getAnimals);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

export const animalRouter = router;
