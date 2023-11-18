/*
 * routes\api\admin\index.js
 * Author: Jesse Salinas
 * Date: 08/22/2023
 * Name: AdminRouter
 * Description: Protected admin routes
 */

const express = require('express');
const router = express.Router();

// Controller
const AdminController = require('../../../controllers/adminController');

// Models
const StudentModel = require('../../../models/students/admin/');
const InstructorModel = require('../../../models/instructors/admin/');

// Instantiate Models
const studentModel = new StudentModel();
const instructorModel = new InstructorModel();

// Instantiate Controller, use dependency injection
const adminController = new AdminController(studentModel, instructorModel);

router.get('/', (req, res) => {
  res.send('API admin protected routes...')
});

//router.get('/dashboard', adminController.getAdminDashboard);
router.get('/instructors', (req, res) => adminController.getAllInstructors(req, res));

module.exports = router;

