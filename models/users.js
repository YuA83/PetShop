const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;