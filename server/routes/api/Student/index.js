/*
 * routes\api\students\index.js
 * Author: Jesse Salinas
 * Date: 08/27/2023
 * Description: Protected student routes
 */

const express = require('express');
const router = express.Router();

// Controller
//const AdminController = require('../../../controllers/adminController');

// Models
//const StudentModel = require('../../../models/students/admin/');
//const InstructorModel = require('../../../models/instructors/admin/');

// Instantiate Models
//const studentModel = new StudentModel();
//const instructorModel = new InstructorModel();

// Instantiate Controller, use dependency injection
//const adminController = new AdminController(studentModel, instructorModel);

//router.get('/dashboard', adminController.getAdminDashboard);
router.get('/', (req, res) => {
  res.send('API student protected routes...')
});

module.exports = router;


