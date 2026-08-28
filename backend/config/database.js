const mongoose = require("mongoose");

require("dotenv").config();


async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            family: 4
        });
        console.log("Database Connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;


