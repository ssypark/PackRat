const express = require('express');
const db = require('../db');
const authenticateToken = require("../auth.jwt");
const categoriesRouter = express.Router();

// Since every user will have different categories, we each user to protect their own categories via JWT
categoriesRouter.use(authenticateToken);


// see items.js for full explanation on how to create a GET endpoint
// this will get all the categories for the user
categoriesRouter.get('/', (req, res) => {

    const userId = req.user.userId; // Get the user ID from the JWT token

    const sql = "SELECT * FROM categories WHERE user_id = ?"; // SQL query to get all categories for the user

    db.query(sql, [userId], (err, results) => {

        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(results);

    });
});

// see items.js for full explanation on how to create a POST endpoint
categoriesRouter.post("/", (req, res) => {
    // Extract category name and color from the request body
    // I added color to the categories table for better organization on the users end
    const { category_name, color } = req.body;

    const userId = req.user.userId; // Get the user ID from the JWT token

    // SQL query to insert a new category
    const addCategorySQL = "INSERT INTO categories (name, color, user_id) VALUES (?, ?, ?)"; // ? placeholders for category name and color

    // This runs the query above, category name replace the ? placeholders in the query
    db.query(addCategorySQL, [category_name, color, userId], (err, results) => { // we add the user ID to the query so that each user has their own categories
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ 
            message: "Category added successfully",
            id: results.insertId // This will return the ID of the new category 
        });
    });
});

// see items.js for full explanation on how to create a DELETE endpoint
// after some testing, I found that deleting a category with items in it will not delete the items
// this is a problem because the items will still be in the database, but not in a category
// I will add a delete items query before deleting the category
// this will delete all items in the category before deleting the category
// this is not the best way to do this, but it works for now
categoriesRouter.delete('/:id', (req, res) => {
    // Extract category ID from the URL
    const { id } = req.params;

    const userId = req.user.userId; // Get the user ID from the JWT token

    // First delete all items in this category first
    const deleteItemsSQL = "DELETE FROM items WHERE category_id = ? AND user_id = ?"; // SQL query to delete all items in the category

    db.query(deleteItemsSQL, [id, userId], (err, itemResults) => {
        if (err) {
            // Log the error and send a 500 response
            console.error("Error deleting items:", err);
            return res.status(500).send(err);
        }

        // Now with the items deleted, we can delete the category
        // SQL query to delete the category
        // This will delete the category with the given ID
        // The ? placeholder will be replaced with the ID of the category to delete
        const deleteCategorySQL = "DELETE FROM categories WHERE id = ? AND user_id = ?";
        db.query(deleteCategorySQL, [id, userId], (err, categoryResults) => {
            if (err) {
                console.error("Error deleting category:", err);
                return res.status(500).send(err);
            }
            // If the category was deleted successfully, send a success message
            // The affectedRows property contains the number of rows affected by the delete query
            // If the category was not found, affectedRows will be 0
            res.json({
                message: "Category and its items deleted successfully",
                itemsDeleted: itemResults.affectedRows, // Number of items deleted
                categoryDeleted: categoryResults.affectedRows // Should be 1 if the category was found and deleted
            });
        });
    });
});

module.exports = categoriesRouter;