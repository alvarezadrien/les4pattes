const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    date: { type: String, required: true }, // format : "2025-08-02"
    creneau: { type: String, required: true }, // ex : "10h00"
    name: String,
    email: String,
    phone: String,
    message: String,
    reason: String,
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
