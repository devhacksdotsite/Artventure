/*
 * routes\api\index.js
 * Author: Jesse Salinas
 * Date: 08/27/2023
 * Description: Authentication API routes
 */

const express = require('express');
const router = express.Router();
const path = require('path');

const mysql = require('mysql2');

// Middleware
const authenticateToken = require('../../middleware/Auth');

// Controller
const UserController = require('../../controllers/UserController');

// Models
const UserModel = require('../../models/User/');

// Instantiate Models
const userModel = new UserModel();

// Instantiate Controller, use dependency injection
const userController = new UserController(userModel);

router.post('/signin', (req, res) => userController.signIn(req, res));

// create account
router.get('/signup', (req, res) => {
  res.send('account create');
});

// logout - auth route
router.get('/signout', (req, res) => {
  res.send('logout');
});

router.get('/', (req, res) => {
  //res.send('Artventure Auth API routes...');

  // Replace these with your actual database connection details
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql_password',
    database: 'artventure',
  });

  // Attempt to connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }

    console.log('Connected to MySQL!');

    // Perform a simple query to fetch a user
    connection.query('SELECT * FROM artventure.user LIMIT 1', (queryErr, results) => {
      if (queryErr) {
        console.error('Error querying MySQL:', queryErr);
        return;
      }

      // Display the fetched user
      const user = results[0];
      console.log('Fetched user:', user);

      // Close the connection after testing
      connection.end((endErr) => {
        if (endErr) {
          console.error('Error closing MySQL connection:', endErr);
          return;
        }
        console.log('Connection closed.');
      });
    });
  });

  res.send('Artventure Auth API routes...');

});

module.exports = router;

