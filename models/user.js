const mongoose = require('mongoose');

// Define a schema for the product
const productSchema = new mongoose.Schema({
    name: {
        type: String, // Assuming you're using ObjectId for product references
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
    // Each product will have its own _id field created by Mongoose by default
});

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isIndividual: {
        type: Boolean,
        default: true,
        required: true
    },
    productsAdded: [productSchema], // Array of products added
    productsBought: [productSchema], // Array of products bought
}, { timestamps: true }); // Automatically create createdAt and updatedAt timestamps

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
