// with express installed we can create a router
const express = require('express');
const itemsRouter = express.Router();
const db = require('../db');
const upload = require('../storage');



// (R)EAD //
// GET endpoint
// creating a GET endpoint to get all items from the database
itemsRouter.get('/', (req, res) => {
    // This query grabs all columns from the "items" table via SELECT and adds the categories name from the "categories" table via JOIN
    // as a new column called "category". It then JOINS the two tables together with the condition that the category_id in the "items" table
    // must match the id in the "categories" table. ie. Helmet id= 1 should go to the Cycling category (id=1). The results are then sent as a response.
    // this is necessary because it allows us to display the category name in the frontend instead of just the category id
    let sql = `
        SELECT items.*, categories.name AS category
        FROM items
        JOIN categories ON items.category_id=categories.id
    `;

    const queryParams = []; // an empty array to store the parameters for the query

    // if a category_id is provided in the query params, add it to the query
    const { category } = req.query;
    if (category) {
        sql += ` WHERE items.category_id IN (?)`;
        // we can handle a single category or an array of categories
        if (Array.isArray(category)) {
            queryParams.push(...category); // the spread operator will add all the elements of the array to the queryParams array
        } else {
            queryParams.push(category);
        }
    }

    // execute the query. 
    db.query(sql, [queryParams], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        }
        res.json(results);
    });
});

// We also need the option to get a single item from the database
itemsRouter.get('/:id', (req, res) => {
    // The id is extracted from the URL to an object so that we can destructure it
    const { id } = req.params;
    // SQL query to get the item with the specified id
    const sql = `
        SELECT items.*, categories.name AS category
        FROM items
        JOIN categories ON items.category_id=categories.id
        WHERE items.id = ?`;
    // Substitute the '?' with the id from the URL to prevent SQL injection
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        console.log(results[0]);

        res.json(results[0]);
    });
});



// (D)ELETE //

// DELETE endpoint
// We now need to create a DELETE endpoint that will allow us to delete an item from the database
itemsRouter.delete('/:id', (req, res) => {
    // The id is extracted from the URL
    const { id } = req.params; 
    // SQL query to delete the item with the specified id
    const sql = `DELETE FROM items WHERE id = ? LIMIT 1`;
    // Substitute the '?' with the id from the URL to prevent SQL injection
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
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
    updateItemSQL += ` WHERE id = ? LIMIT 1`;
    queryParams.push(id);

    // Run the query above, substituting the '?' placeholders with the item name, category ID, image (if uploaded) and ID in that order
    db.query(updateItemSQL, queryParams, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("An error occurred while updating the item");
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
    
    // The uploaded file's filename is stored in 'req.file.filename' also need to avoid error when no image is uploaded
    const image = req.file ? req.file.filename : null; // if a file was uploaded, store its filename, otherwise set it to null
    //this is necessary for this web app because of the amount of item images what would be added(I have too many hobbies and too many items)

    // Create the SQL query to insert a new item.
    // This query uses placeholders (?) for the values to prevent SQL injection.
    const addItemSQL = `INSERT INTO items (name, description, category_id, image_filename) VALUES (?, ?, ?, ?)`;

    // This runs the query above, item name, description, category ID and image filename replace the ? placeholders in the query
    db.query(addItemSQL, [name, description, category_id, image], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("An error occurred while adding the item");
        }
        // Respond with a success message if insertion was successful.
        res.json({ message: "Item added successfully" });
    });
});



module.exports = itemsRouter;