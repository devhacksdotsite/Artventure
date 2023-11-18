/*
 * routes\api\index.js
 * Author: Jesse Salinas
 * Date: 08/27/2023
 * Description: Private API routes
 */

const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware
//const authenticate = require('../../middleware/Auth');

// API protected routes
const apiAdminRoutes = require('./Admin/');
const apiStudentRoutes = require('./Student/');

//app.use('/private/', authenticate);

router.use('/student/', apiStudentRoutes);
router.use('/admin/', apiAdminRoutes);

router.get('/', (req, res) => {
  res.send('Artventure API Private routes...');
});

module.exports = router;

