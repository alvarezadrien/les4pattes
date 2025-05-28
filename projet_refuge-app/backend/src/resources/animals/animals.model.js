import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      species: { type: String, required: true, trim: true },
      age: { type: Number, min: 0 },
      description: { type: String, default: '', trim: true },
      image: { type: String, default: null },
      deletedAt: { type: Date, default: null },
}, { timestamps: true });

export const Animal = mongoose.model('Animal', animalSchema);
