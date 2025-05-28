import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    species: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 0,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    }, import mongoose from 'mongoose';

    const animalSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        species: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            min: 0,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        image: {
            type: String,  // URL ou nom du fichier image
            default: null,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // lien vers modèle User
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    }, {
        timestamps: true, // ajoute createdAt et updatedAt automatiquement
    });

    // Optional: méthode pour suppression douce (soft delete)
    animalSchema.methods.softDelete = function () {
        this.deletedAt = new Date();
        return this.save();
    };

    export const Animal = mongoose.model('Animal', animalSchema);

    image: {
        type: String,  // nom du fichier ou URL de l'image
        default: null,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // lien vers le modèle utilisateur si besoin
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,  // createdAt et updatedAt automatiques
});

export const Animal = mongoose.model('Animal', animalSchema);

