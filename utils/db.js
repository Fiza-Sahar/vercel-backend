const mongoose = require("mongoose");
// const URI =  "mongodb://127.0.0.1:27017/mern_admin";


const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
        
        
    } catch (error) {
        console.log("Database Connection failed");
        process.exit(0);
        
    }
}

module.exports = connectDb;