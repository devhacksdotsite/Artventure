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
  res.send('Artventure Auth API routes...');
});

module.exports = router;

