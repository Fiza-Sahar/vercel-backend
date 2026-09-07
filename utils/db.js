const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        if (!URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(URI);

        console.log("Connection successful to DB");

    } catch (error) {
        console.error("Database Connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDb;