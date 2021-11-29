const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    petName: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    petBirth: {
        type: Date,
        required: true
    }
});

const Pets = mongoose.model("Pets", PetSchema);
module.exports = Pets;