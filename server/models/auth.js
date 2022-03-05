const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hex: {
        type: String,
        required: true
    }
});

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;