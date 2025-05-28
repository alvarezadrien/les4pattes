import { Animal } from './animals.model.js';
import { NotFoundError } from '../../api/errors/index.js';

// Création d'un animal
const createAnimal = async (req, res, next) => {
    try {
        const newAnimal = new Animal(req.body);
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
        next(error);
    }
};

// Récupérer la liste des animaux (avec pagination et recherche)
const getAnimals = async (req, res, next) => {
    try {
        // Récupérer les params, convertir en nombre
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        // Requête : nom contenant search, et pas supprimé (deletedAt null)
        const query = {
            name: { $regex: search, $options: 'i' },
            deletedAt: null
        };

        const animals = await Animal.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Animal.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        console.log(`Recherche animaux - page: ${page}, limit: ${limit}, search: "${search}"`);
        console.log(`Animaux trouvés: ${animals.length} / total: ${total}`);

        res.status(200).json({ data: animals, metadata: { total, totalPages } });
    } catch (error) {
        next(error);
    }
};


// Récupérer un animal par ID
const getAnimalById = async (req, res, next) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (!animal) {
            throw new NotFoundError('Animal not found');
        }

        res.json(animal);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour un animal
const updateAnimal = async (req, res, next) => {
    try {
        const updateData = req.body;

        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedAnimal) {
            throw new NotFoundError('Animal not found');
        }

        res.json(updatedAnimal);
    } catch (error) {
        next(error);
    }
};

// Supprimer un animal (soft delete)
const deleteAnimal = async (req, res, next) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (!animal) {
            throw new NotFoundError('Animal not found');
        }

        // Soft delete : on met la date de suppression
        await Animal.findByIdAndUpdate(req.params.id, { deletedAt: new Date() });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export {
    createAnimal,
    getAnimals,
    getAnimalById,
    updateAnimal,
    deleteAnimal
};
