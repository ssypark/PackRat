const express = require('express');
const db = require('../db');

const categoriesRouter = express.Router();

// see items.js for full explanation on how to create a GET endpoint
categoriesRouter.get('/', (req, res) => {

    const sql = "SELECT * FROM categories";

    db.query(sql, (err, results) => {

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

    // SQL query to insert a new category
    const addCategorySQL = "INSERT INTO categories (name, color) VALUES (?, ?)"; // ? placeholders for category name and color

    // This runs the query above, category name replace the ? placeholders in the query
    db.query(addCategorySQL, [category_name, color], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: "Category added successfully" });
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

    // First delete all items in this category first

    const deleteItemsSQL = "DELETE FROM items WHERE category_id = ?";
    db.query(deleteItemsSQL, [id], (err, itemResults) => {
        if (err) {
            // Log the error and send a 500 response
            console.error("Error deleting items:", err);
            return res.status(500).send(err);
        }

        // Now with the items deleted, we can delete the category
        // SQL query to delete the category
        // This will delete the category with the given ID
        // The ? placeholder will be replaced with the ID of the category to delete
        const deleteCategorySQL = "DELETE FROM categories WHERE id = ?";
        db.query(deleteCategorySQL, [id], (err, categoryResults) => {
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