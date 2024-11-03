const express = require("express");
const router = express.Router();
const User = require('../models/user'); // Ensure the path is correct
const Organization = require('../models/org'); // Ensure the path is correct

// POST request to add an individual user
router.post('/indiv', async (req, res) => {
    const { email, password, isIndividual = true } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        // Create a new individual user
        const newUser = new User({
            email,
            password,
            isIndividual,
            productsAdded: [],
            productsBought: []
        });

        // Save user to the database
        await newUser.save();
        res.status(201).send("Individual user created successfully.");
    } catch (error) {
        console.error("Error creating individual user:", error);
        res.status(500).send("Server error");
    }
});

// POST request to add an organization user
router.post('/org', async (req, res) => {
    const { id, password, isIndividual = false } = req.body; // Make sure to provide `email`

    try {
        // Check if organization user already exists
        const existingOrg = await Organization.findOne({ id });
        if (existingOrg) {
            return res.status(400).send("Organization user with this email already exists.");
        }

        // Create a new organization user
        const newOrgUser = new Organization({
            id,
            password,
            isIndividual,
            productsAdded: [],
            productsBought: []
        });

        // Save organization user to the database
        await newOrgUser.save();
        res.status(201).send("Organization user created successfully.");
    } catch (error) {
        console.error("Error creating organization user:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
