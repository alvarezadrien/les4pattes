// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'User', // Fais attention à ce que 'User' corresponde au nom de ton modèle d'utilisateur si tu en as un
        required: true
    },
    username: {
        type: String,
        required: true
    },
    commentText: { // Renommé pour correspondre à commentText dans ton frontend
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);