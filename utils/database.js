// Author: Stephen Garo
// Date: 2024-10-18
// Course Module: Web Application Development (CPRG-210-A)
// Assignment: Node Final Assignment


const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Creating connection 
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

// Exporting the connection for use in any js file    
module.exports = con;


