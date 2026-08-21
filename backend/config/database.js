const mongoose = require("mongoose");

// require("dotenv").config();


async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
        console.log("Database Connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports=connect;


