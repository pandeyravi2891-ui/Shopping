const mongoose = require("mongoose");

const signin = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },



    otp: {
        type: String,
        required: true,
        ref: "OTP"
    },

    otpVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        // required: true,
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },

    phone: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    dob: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },






})

module.exports = mongoose.model("User", signin);

