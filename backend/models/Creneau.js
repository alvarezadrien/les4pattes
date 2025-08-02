const mongoose = require("mongoose");

const creneauSchema = new mongoose.Schema({
    heure: { type: String, required: true }, // ex : "10h00"
});

module.exports = mongoose.model("Creneau", creneauSchema);
