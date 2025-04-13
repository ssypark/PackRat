// import the .env file variables
require('dotenv').config();

// with express installed we can create a router
const express = require('express');
// creating a router for this endpoint
const itemsRouter = express.Router();
// connecting to the database
const db = require('../db');
// connecting to the upload middleware
const upload = require('../storage');
// connecting to the JWT authentication middleware
const authenticateToken = require("../auth.jwt");

// PROTECTING THE ROUTES
// we need to protect the routes so that only authenticated users can access them
itemsRouter.use(authenticateToken);
// this will protect all the routes in this router

// (R)EAD //
// GET endpoint
// creating a GET endpoint to get all items from the database
// this is necessary because we need to display all the current the items in the category's grid
itemsRouter.get('/', (req, res) => {
    // This query grabs all columns from the "items" table via SELECT and adds the categories name from the "categories" table via JOIN
    // as a new column called "category". It then JOINS the two tables together with the condition that the category_id in the "items" table
    // must match the id in the "categories" table. ie. Helmet id= 1 should go to the Cycling category (id=1). The results are then sent as a response.
    // this is necessary because it allows us to display the category name in the frontend instead of just the category id
    const category = req.query.category;

    const userId = req.user.userId; // Get the user ID from the JWT token

    // We then start building the SQL query including the user ID
    // this is necessary because we need to get the items for the logged in user
    let sql = `
        SELECT items.*, categories.name AS category
        FROM items
        JOIN categories ON items.category_id=categories.id
        WHERE `;

    // Start with an empty array for our parameters
    const queryParams = [];

    // Check if category filter is provided
    if (category) {
        // Add category filtering to the query
        sql += `items.category_id IN (?) AND `;

        // Handle both array of categories or a single category
        if (Array.isArray(category)) {
            // If it's an array, spread the values into queryParams
            queryParams.push(...category);
        } else {
            // If it's a single value, just add it to queryParams
            queryParams.push(category);
        }
    }

    // Always add the user filter
    sql += `items.user_id = ?`;
    queryParams.push(userId);

    // execute the query with all our parameters
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            res.status(500).send('An error occurred');
        }
        res.json(results);
    });
});

// We also need the option to get a single item from the database
// this is for the item details page
itemsRouter.get('/:id', (req, res) => {
    // The id is extracted from the URL to an object so that we can destructure it
    const { id } = req.params;
    
    const userId = req.user.userId; // Get the user ID from the JWT token
    
    // SQL query to get the item with the specified id
    // Also ensure the item belongs to the authenticated user
    const sql = `
        SELECT items.*, categories.name AS category
        FROM items
        JOIN categories ON items.category_id=categories.id
        WHERE items.id = ? AND items.user_id = ?`; // Added user_id check
        
    // Substitute the '?' with the id from the URL and the user ID to prevent SQL injection
    db.query(sql, [id, userId], (err, results) => { // Added userId parameter
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        
        // If no results were found (either item doesn't exist or doesn't belong to user)
        if (results.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        res.json(results[0]);
    });
});

// (D)ELETE //

// DELETE endpoint
// We now need to create a DELETE endpoint that will allow us to delete an item from the database
itemsRouter.delete('/:id', (req, res) => {
    // The id is extracted from the URL
    const { id } = req.params; 
    
    const userId = req.user.userId; // Get the user ID from the JWT token
    
    // SQL query to delete the item with the specified id, ensuring it belongs to this user
    const sql = `DELETE FROM items WHERE id = ? AND user_id = ? LIMIT 1`; // Added user_id check
    
    // Substitute the '?' with the id from the URL and user ID to prevent SQL injection
    db.query(sql, [id, userId], (err, results) => { // Added userId parameter
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        
        // Check if an item was actually deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found or unauthorized" });
        }
        
        res.json({ message: "Item deleted successfully" });
    });
});

// (U)PDATE //

// PUT endpoint
// We now need to create a PUT endpoint that will allow users to update an item in the database
itemsRouter.put('/:id', upload.single('image'), (req, res) => {
    // First we will get the id from the URL
    const { id } = req.params;
    
    const userId = req.user.userId; // Get the user ID from the JWT token
    
    // Get the item and category ID from the request body
    const { name, description, category_id } = req.body;

    let updateItemSQL = `
        UPDATE items
        SET name = ?, description = ?, category_id = ?
    `;

    const queryParams = [name, description, category_id];

    // if a file was uploaded, add it to the query
    if (req.file) {
        updateItemSQL += `, image_filename = ?`;
        queryParams.push(req.file.filename);
    }

    // Then we complete the SQL query by adding the WHERE clause to only update the item with the matching ID
    // Also ensure the item belongs to this user
    updateItemSQL += ` WHERE id = ? AND user_id = ? LIMIT 1`; // Added user_id check
    queryParams.push(id);
    queryParams.push(userId); // Added userId parameter

    // Run the query above, substituting the '?' placeholders with the item name, category ID, image (if uploaded), ID, and user ID in that order
    db.query(updateItemSQL, queryParams, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("An error occurred while updating the item");
        }
        
        // Check if an item was actually updated
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found or unauthorized" });
        }
        
        res.json({ message: "Item updated successfully" });
    });
});

// (C)REATE //

// POST endpoint
// We now need to create a POST endpoint that will allow us to add new items to the database
itemsRouter.post('/', upload.single('image'), (req, res) => {
    // First we will destructure the required fields from the request body
    const { name, description, category_id } = req.body;
    
    const userId = req.user.userId; // Get the user ID from the JWT token
    
    // The uploaded file's filename is stored in 'req.file.filename' also need to avoid error when no image is uploaded
    const image = req.file ? req.file.filename : null; // if a file was uploaded, store its filename, otherwise set it to null
    //this is necessary for this web app because of the amount of item images what would be added(I have too many hobbies and too many items)

    // Create the SQL query to insert a new item.
    // This query uses placeholders (?) for the values to prevent SQL injection.
    // Also include the user_id in the insertion
    const addItemSQL = `INSERT INTO items (name, description, category_id, image_filename, user_id) VALUES (?, ?, ?, ?, ?)`; // Added user_id field

    // This runs the query above, item name, description, category ID, image filename, and user ID replace the ? placeholders in the query
    db.query(addItemSQL, [name, description, category_id, image, userId], (err, results) => { // Added userId parameter
        if (err) {
            console.log(err);
            return res.status(500).send("An error occurred while adding the item");
        }
        // Respond with a success message if insertion was successful.
        res.json({ 
            message: "Item added successfully",
            id: results.insertId // Return the new item ID for convenience
        });
    });
});

module.exports = itemsRouter;