const Animal = require('./models/Animal');

// Obtenir tous les animaux (GET /api/animals)
const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des animaux', error });
    }
};

module.exports = {
    getAnimals
};
