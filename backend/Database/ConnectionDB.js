const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Your Database is connected');
    } catch (error) {
        console.log('Your Database is not connected');
        console.log(error);
    }
}

module.exports = { connectionDB };