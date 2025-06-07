const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const adoptionRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    formdata: { type: Object, required: true },
    status: { type: String, enum: ['Pending', 'In Review', 'Approved', 'Rejected'], default: 'Pending' },
    messages: [messageSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
