const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    postcode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    detailAddress: {
        type: String,
    },
    extraAddress: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    }
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;