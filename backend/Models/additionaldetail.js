const mongoose = require("mongoose");

const additionaldetail = new mongoose.Schema({
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

})

module.exports = mongoose.model("AdditionalDetail", additionaldetail);