const mongoose = require("mongoose");

require("dotenv").config();


async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL, {
            family: 4
        });
            
        console.log("Database Connected");
    } catch (err) {
        console.error("Database Connection Failed:", err); throw err;
    }
}

module.exports = connect;


