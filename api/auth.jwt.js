require('dotenv').config();
const jwt = require("jsonwebtoken");

// We first need to get the JWT secret from the environment variables (.env) file
const JWT_SECRET = process.env.JWT_SECRET;

// This middleware function checks if the request has a valid JWT token
const authenticateToken = (req, res, next) => {

    // Here, we pull the Authorization header out of the headers
    const authHeader = req.headers["authorization"];

    // We then get the token from it
    const token = authHeader && authHeader.split(" ")[1]; // This splits the header string into an array and gets the second element (the token)
    // If there's no token, we send an error response
    if(!token) {
        return res.status(401).json({ message: "Access Denied" })
    }

    // We verify the token using the secret
    // callback of jwt.verify() will be called once the token is verified
    // If the token is valid, it will return the decoded user data
    // If the token is invalid, it will return an error
    // The decoded user data will be passed to the next middleware function
    jwt.verify(token, JWT_SECRET, (err, userData) => {

        // If there's an error, it means the token did not validate
        if(err) {
            return res.status(403).json({ message: "Invalid or expired token" })
        }

        // If everything is good, we attach the user data to the request object
        req.user = userData;
        next(); // Call the next middleware function in the stack
    })

}

module.exports = authenticateToken; // Export the middleware function