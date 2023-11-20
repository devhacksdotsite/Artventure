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

router.use('/', authenticateToken);

router.use('/student/', apiStudentRoutes);
router.use('/admin/', apiAdminRoutes);

router.get('/', (req, res) => {
  res.send('Artventure API Private routes...');
});

module.exports = router;

