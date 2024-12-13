const mongoose = require("mongoose");

async function connection() {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Ishop"; // Default to local if not defined
    try {
        const conn = await mongoose.connect(mongoUri, {
            dbName: "Ishopsecond", // Make sure the db name is correct
        });
        console.log("DB connected successfully");
        return conn;
    } catch (error) {
        console.error("DB not connected:", error);
        throw error; // This will propagate the error and stop execution
    }
}

module.exports = connection;
