const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, enum: ['user', 'refuge'], required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const demandeAdoptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assurez-vous que c'est le nom de votre modèle utilisateur
        required: true,
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal', // Assurez-vous que c'est le nom de votre modèle animal
        required: true,
    },
    motivation: { type: String, required: true },
    logementType: { type: String, required: true },
    hasJardin: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['En attente', 'En cours', 'Approuvée', 'Refusée', 'Terminée'],
        default: 'En attente',
    },
    messages: [messageSchema], // Tableau de messages pour le suivi
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Mettre à jour 'updatedAt' à chaque sauvegarde
demandeAdoptionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('DemandeAdoption', demandeAdoptionSchema);