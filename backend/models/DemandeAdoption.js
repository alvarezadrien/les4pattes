// models/DemandeAdoption.js

const mongoose = require('mongoose');

const demandeAdoptionSchema = new mongoose.Schema({
    // Référence à l'utilisateur qui fait la demande
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Fait référence au modèle User
        required: true
    },
    // Référence à l'animal concerné par la demande
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal', // Vous devrez avoir un modèle Animal
        required: true
    },
    // État de la demande d'adoption
    status: {
        type: String,
        enum: ['en attente', 'en cours', 'approuvée', 'refusée', 'annulée'],
        default: 'en attente'
    },
    // Messages du refuge ou de l'utilisateur concernant la demande
    messages: [
        {
            sender: { // Qui a envoyé le message ('user' ou 'refuge')
                type: String,
                enum: ['user', 'refuge'],
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // Date de création de la demande
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Date de la dernière mise à jour
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('DemandeAdoption', demandeAdoptionSchema);