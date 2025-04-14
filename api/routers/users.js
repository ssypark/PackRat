// SETUP AND IMPORTS
// Get the ENV configuration file
require('dotenv').config();

const express = require('express');

// We then need to get the required function from the validator (express-validator) package
const { body, validationResult } = require('express-validator');

// Then we use BCRYPT for password hashing for enhanced security
const bcrypt = require('bcrypt');

// Use the JWT package for token generation for user sessions
const jwt = require('jsonwebtoken');
const db = require('../db');

// PROCESSING THE ENV FILE
// Here we get the secret key to use for later
const JWT_SECRET = process.env.JWT_SECRET;

const usersRouter = express.Router();


// POST endpoint to sign up a new user
usersRouter.post("/", [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(), // this checks if the email is valid and normalizes it 
    body('username').isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'), // this checks if the username is between 3 and 30 characters
    body("password").isLength({ min: 8 }).withMessage("Must be at least 8 characters long") // this checks if the password is at least 8 characters long
], async (req, res) => {
    // Collect the errors
    const errors = validationResult(req);

    // If there are errors send a 400 level back
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Here we can use bcrypt to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Run the query, now including username
    db.query(
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
        [email, username, hashedPassword],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            res.status(201).json({
                message: "User Created!",
                userId: result.insertId
            })

        }
    );

});


// With an account, we can create a POST endpoint to sign in a fellow packrat
usersRouter.post("/sign-in", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Run the query to get the user with a corresponding email
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {

        if (err || results.length === 0) { // what if the email does not exist? we need to handle that error by checking if the results array is empty
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        // Get the user from the results
        const userData = results[0];

        // Compare the password with the hashed password via bcrypt in the database
        const passwordMatch = await bcrypt.compare(password, userData.password);

        // If the password does not match, return an error
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create a JWT token and send it back, valid for 5 hours
        const token = jwt.sign(
            { 
                userId: userData.id, 
                email: userData.email,
                username: userData.username  // Add username to the token
            },
            JWT_SECRET,
            { expiresIn: "500h" }
        );

        // Send back the token, user ID, and username
        res.json({
            jwt: token,
            username: userData.username,
            message: "Sign in successful"
        });
    })

});

module.exports = usersRouter;
