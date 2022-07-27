
const mongoose = require("mongoose");

const connectDB = async () => {


    try {

        let conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo connected: ${conn.connection.host}`.cyan.underline.bold);


    } catch (error) {
        console.log(`Error message: ${error.message}`.red.underline.bold);

        process.exit(1);
    }
};

module.exports = connectDB;