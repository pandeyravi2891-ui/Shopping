const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
    },

    expiretAt:{
        type:Date,
        required:true,
    }
})

module.exports = mongoose.model("OTP", otpSchema);