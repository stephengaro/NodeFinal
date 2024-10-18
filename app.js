// Author: Stephen Garo
// Date: 2024-10-18
// Course Module: Web Application Development (CPRG-210-A)
// Assignment: Node Final Assignment

// Imported the express module to create a web server
const express = require("express");

// Set up dotenv
require('dotenv').config();

// Imported the database utility for database operations
const db = require('./utils/database')

// Imported the path module to handle file paths
const path = require('path')

// Imported a custom module for generating random greetings
const getRandomGreeting = require('./greetings');

// Created an instance of an Express application
const app = express();

// Port number that the server will listen on
const port = process.env.PORT || 8000;

//Setting template engine to ejs
app.set("view engine", "ejs")

// Static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Middleware to parse response from webpage
app.use(express.urlencoded({ extended: true }));

// Home page route
app.get('/', (req, res) => {
    const randomGreeting = getRandomGreeting(); // Get a random greeting
    res.render('home', { greeting: randomGreeting });
});

// About page route
app.get('/about', (req, res) => {
    res.render('about'); 
});

//Retrieving all comments
app.get('/contact', (req,res)=>{
    const sql = 'select * from contacts';

    //Execute the query
    db.query(sql, (err, result, field)=> {
        if(err) throw err;
        console.log(result);
        res.render('contact', {contacts:result});
        console.log(field);

    });
});

// Handle add comment submission
app.post('/contact', (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, phonenumber, city, province, postal, feedback } = req.body;
    
    // Check if the email already exists
    const checkEmailSql = 'SELECT * FROM contacts WHERE email = ?';
    
    db.query(checkEmailSql, [email], (err, emailResult) => {
        if (err) throw err;

        if (emailResult.length > 0) {
            // Email already exists because database email column is unique
            return res.send('This email already exists. Please click back on your browser and try a different email.');
        }

        // Proceeds to insert the new contact
        const sqlInsert = 'INSERT INTO contacts (firstname, lastname, email, phonenumber, city, province, postal, feedback) VALUES (?,?,?,?,?,?,?,?)';
        
        db.query(sqlInsert, [firstname, lastname, email, phonenumber, city, province, postal, feedback], (err, result) => {
            if (err) throw err;

            // Fetch the newly added contact's information
            const sqlSelect = 'SELECT * FROM contacts WHERE id = ?';
            db.query(sqlSelect, [result.insertId], (err, contactResult) => {
                if (err) throw err;

                // Rendering contact information in thank you page
                res.render("thank-you", {
                    titlePage: "Thank You!",
                    review: feedback,
                    contact: contactResult[0] // Pass the contact information to the thank-you page
                });
            });
        });
    });
});


//Handles edit 
app.get('/edit-review/:id', (req, res) => {
    console.log(req.params);
    const sql = 'SELECT * FROM contacts WHERE id=?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('confirm-email', { contact: result[0] });
    });
});

// Handle email confirmation for update
app.post('/confirm-email/:id', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM contacts WHERE id=?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;

        if (result.length > 0 && result[0].email === email) {
            // If email matches, redirect to edit page
            res.render('edit-review', { contact: result[0] });
        } else {
            // If email does not match, show an error
            res.send('Email does not match. Please click back on your browser and try again.');
        }
    });
});

//Handle updated details
app.post('/edit-review/:id', (req,res)=>{
    const { firstname, lastname, email, phonenumber, city, province, postal, feedback} = req.body;
    const sql = 'UPDATE contacts'+
    ' SET firstname = ?, lastname = ?, email = ?, phonenumber = ?, city = ?, province = ?, postal = ?, feedback = ?'+
    ' where id = ?';
    db.query(sql, [firstname, lastname, email, phonenumber, city, province, postal, feedback, req.params.id], (err, result)=>{
        if(err) throw err
        console.log("Reviews updated");
        res.redirect('/contact');
    });
});


// Handle delete confirmation
app.get('/delete/:id', (req, res) => {
    const sql = 'SELECT * FROM contacts WHERE id=?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('confirm-delete', { contact: result[0] });
    });
});


// Handle email confirmation for deletion
app.post('/confirm-delete/:id', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM contacts WHERE id=?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;

        if (result.length > 0 && result[0].email === email) {
            // Email matches, continue to delete
            const deleteSql = 'DELETE FROM contacts WHERE id=?';
            db.query(deleteSql, [req.params.id], (err) => {
                if (err) throw err;
                console.log("Contact deleted");
                res.redirect('/contact'); // Redirect to contact page after deletion
            });
        } else {
            // Email does not match, show an error
            res.send('Email does not match. Please click back on your browser and try again.');
        }
    });
});

  

//Endpoint for error page/ renders all pages above but if there isnt anything to use, it uses this page as an error
app.use((req, res) => {
    res.render("404")
    console.log(__dirname);
});


// Starting the server
app.listen(port, () => {
    console.log("Web server is running at port 8000")
});