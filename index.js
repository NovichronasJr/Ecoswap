const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const User = require('./models/user');
const Organization = require('./models/org');
const firstPath = require('./Controller/firstpath');
const connectDB = require('./Connect/db');
const cookieParser = require('cookie-parser'); // Required for reading cookies
const mport = 27017;

connectDB(mport);

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie-parser middleware
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/', firstPath); // Mount the router to the root path

// Route to render the product form
app.get('/sell', (req, res) => {
    res.render('sell');
});

// Route to handle adding a product
app.post('/add-product', async (req, res) => {
    try {
        const { productName, imageUrl } = req.body;
        
        // Retrieve userId from cookies
        const userId = req.cookies.userId; // Ensure the cookie is set at login
        
        if (!userId) {
            return res.status(401).send('User not authenticated. Please log in.');
        }

        // Find the user by ID and update their productsAdded array
        await User.findByIdAndUpdate(userId, {
            $push: {
                productsAdded: {
                    name: productName,
                    imageUrl: imageUrl
                }
            }
        });

        // Redirect to the /product route after adding the product
        res.redirect('/product');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the product.');
    }
});

// Route to display all products
app.get('/product', async (req, res) => {
    try {
        const userId = req.cookies.userId;
        
        if (!userId) {
            return res.status(401).send('User not authenticated. Please log in.');
        }

        // Find the user and get their productsAdded
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Render the product.ejs template with the products array
        res.render('product', { products: user.productsAdded });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching products.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
});
