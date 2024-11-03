const express = require("express");
const User = require('../models/user');
const Organization = require('../models/org');
const router = express.Router();
const cookieParser = require('cookie-parser');
const userpage = require('../Pages/userpage'); // Assuming this is the correct path to your userpage.js

// Use cookie-parser
router.use(cookieParser());

// Render homepage on GET /
router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/about',(req,res)=>{
    res.render('about');
})

// Use the secondpath router for all routes under /signup
const secondpath = require('./SecondSign'); // Ensure the path is correct
router.use('/signup', secondpath); // Correctly mounts the secondpath router

// Render individual login page
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/login/indv', (req, res) => {
    res.render('loginind');
});

// Render organization login page
router.get('/login/org', (req, res) => {
    res.render('loginorg');
});

// Handle login for individual users
router.post('/login/indv', async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if the password is correct
        if (user.password === password) {
            // Set cookie with userId (assuming user._id is the user ID you want to store)
            res.cookie('userId', user._id, {
                httpOnly: true, // Helps mitigate the risk of client-side script accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 1000 * 60 * 60 * 24 // 1 day expiration
            });

            // Redirect to the user page after setting the cookie
            return res.redirect('/userpage'); // Correctly redirect to userpage route
        } else {
            return res.status(401).send("Invalid credentials"); // Invalid password
        }

    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).send("Server error");
    }
});

// Handle login for organizations
router.post('/login/org', async (req, res) => {
    let { id } = req.body;
    try {
        const org = await Organization.findOne({ id });
        if (!org) {
            return res.status(404).send("Organization not found");
        }
        res.redirect('/');
    } catch (error) {
        console.error("Error checking organization existence:", error);
        return res.status(500).send("Server error");
    }
});

// Make sure to import the userpage router to render the user page
router.use('/userpage', userpage); // Correctly mount the userpage router

module.exports = router; // Export the router
