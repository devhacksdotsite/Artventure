/*
 * routes\api\index.js
 * Author: Jesse Salinas
 * Date: 08/27/2023
 * Description: Authentication API routes
 */

const express = require('express');
const router = express.Router();
const path = require('path');

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

// Unauthenticated Routes

// Create account
router.get('/signup', (req, res) => {
  res.send('account create');
});

// User signin
router.post('/signin', (req, res) => userController.signIn(req, res));

// logout - this will need to be part of auth routes
router.get('/signout', (req, res) => {
  res.send('logout');
});

router.get('/', (req, res) => {

  // Provide details...
  res.send('Welcome to the Artventure Portal API.');
});

module.exports = router;

