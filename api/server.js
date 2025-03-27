// this is the main server file for the API
// it imports all the necessary modules and routers, establishes the middleware and starts the Express server
const express = require('express');
const cors = require('cors'); // enables cross-origin resource sharing
const app = express();
const bodyParser = require('body-parser'); // enables parsing of JSON data so that
const itemsRouter = require('./routers/items');
const categoriesRouter = require('./routers/categories');
const port = 3000;

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the 'public' folder as a static folder
app.use(express.static('public'));

// Use the routers 
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});