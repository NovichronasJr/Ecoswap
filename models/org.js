const mongoose = require('mongoose');

// Define a schema for the product
const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId for product references
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
    // Mongoose will automatically create an _id for each product
});

// Define the organization schema
const orgSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    isIndividual: {
        type: Boolean,
        required: true,
        default: false
    },
    productsAdded: [productSchema], // Array of products added
    productsBought: [productSchema]  // Array of products bought
}, { timestamps: true }); // Automatically create createdAt and updatedAt timestamps

// Create the Organization model
const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
