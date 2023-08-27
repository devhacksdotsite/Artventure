/*
 * routes\api\admin\index.js
 * Author: Jesse Salinas
 * Date: 08/22/2023
 */

const express = require('express');
const router = express.Router();
const adminController = require('../../../controllers/adminController');

router.get('/dashboard', adminController.getAdminDashboard);
router.get('/instructors', adminController.getAdminInstructors);

module.exports = router;

