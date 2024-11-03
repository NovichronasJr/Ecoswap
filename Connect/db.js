const mongoose = require('mongoose');

const connectDB = async (mport) => {
    try {
        const connection = await mongoose.connect(`mongodb://localhost:${mport}/Ecosaver`);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
