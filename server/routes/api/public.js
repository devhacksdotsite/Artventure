/*
 * routes\api\index.js
 * Author: Jesse Salinas
 * Date: 08/27/2023
 * Description: Public API routes
 */

const express = require('express');
const router = express.Router();
const path = require('path');


//router.use('/login', UserRoutes);

router.get('/', (req, res) => {
  res.send('Artventure Public API routes...');
});

module.exports = router;

