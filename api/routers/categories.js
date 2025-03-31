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
categoriesRouter.delete('/:id', (req, res) => {
    // Extract category ID from the URL
    const { id } = req.params;

    // SQL query to delete the category with the specified ID
    const sql = "DELETE FROM categories WHERE id = ?";
    // This runs the query above, category name replace the ? placeholders in the query
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error deleting category:", err);
        return res.status(500).send(err);
      }
      res.json({ message: "Category deleted successfully" });
    });
  });
module.exports = categoriesRouter;