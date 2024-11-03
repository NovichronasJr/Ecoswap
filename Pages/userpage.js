const express = require('express');
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// Define the /userpage route
router.get('/', async (req, res) => {
    const userId = req.cookies.userId; // Access the userId from the cookie

    if (!userId) {
        return res.status(401).send("Unauthorized access, please log in");
    }

    try {
        const user = await User.findById(userId); // Use the userId from the cookie to find the user
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Render the user page and pass the user's email
        res.render('userpage', { email: user.email }); // Pass the user's email to the template
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).send("Server error");
    }
});

module.exports = router; // Export the router
