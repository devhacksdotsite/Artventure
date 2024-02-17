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
const authenticateToken = require('../../middleware/Auth');

// API protected routes
const apiAdminRoutes = require('./Admin/');
const apiStudentRoutes = require('./Student/');

// JWT Authenticate
router.use('/', authenticateToken);

// Use private student routes
router.use('/student/', apiStudentRoutes);

// Use private student routes
router.use('/admin/', apiAdminRoutes);

// Global private routes
router.get('/', (req, res) => {

  // Provide Details
  res.send('Artventure API Private Routes.');
});

router.get('/curriculum', (req, res) => {
  res.send('Artventure API Private routes...');
});

module.exports = router;

