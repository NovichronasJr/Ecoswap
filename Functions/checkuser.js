const User = require('./models/user'); // Make sure the path to your User model is correct

// Middleware to check if user exists
const checkUserExists = async (req, res, next) => {
    const { email } = req.body; // Assuming the user is identified by email

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        // If user exists, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).send("Server error");
    }
};
