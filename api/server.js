// this is the main server file for the API
// it imports all the necessary modules and routers, establishes the middleware and starts the Express server

const express = require('express');
const cors = require('cors'); // enables cross-origin resource sharing
const app = express(); // creates an Express application
const bodyParser = require('body-parser'); // enables parsing of JSON data so that
const itemsRouter = require('./routers/items'); // imports the items router
const categoriesRouter = require('./routers/categories'); // imports the categories router
const usersRouter = require('./routers/users'); // imports the users router
const port = 3000; // sets the port number

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the 'public' folder as a static folder
app.use(express.static('public'));

// Public routes (no authentication required)
// we use the users router to handle requests to the /users endpoint

// Protected routes (authentication required)
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);
app.use("/users", usersRouter); 

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});