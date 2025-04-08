const mysql = require('mysql2'); // mysql2 package
const db = mysql.createConnection({ // this will create a connection to the database
    host: 'localhost', // localhost
    user: 'root', // default username
    password: 'root', // default password
    database: 'packrat', // database name
    port: 8889 // default port
});


db.connect((err) => { // This will connect to the database by using the connection object

    if (err) { // if there is an error, then it logs the error
        console.error('Error connecting: ' + err.stack);
        return;
    }
    
    console.log('Connected as id ' + db.threadId); // to verify that we are connected, we log the thread id
});
    
module.exports = db;
