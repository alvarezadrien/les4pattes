const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Animal', AnimalSchema);
