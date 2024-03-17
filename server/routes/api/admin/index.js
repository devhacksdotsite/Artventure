/*
 * @\routes\api\admin\index.js
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
const PatronModel = require('../../../models/Patrons/admin/');
const StudentModel = require('../../../models/students/admin/');
const InstructorModel = require('../../../models/instructors/admin/');

// Instantiate Models
const patronModel = new PatronModel();
const studentModel = new StudentModel();
const instructorModel = new InstructorModel();

// Instantiate Controller, use dependency injection
const adminController = new AdminController(patronModel, studentModel, instructorModel);

router.get('/', (req, res) => {
  res.send('API admin protected routes...')
});

//router.get('/dashboard', adminController.getAdminDashboard);

/*************************************
             Instructors
*************************************/

// GET all instructors
router.get('/instructors', (req, res) => { adminController.getInstructors(req, res) });

// GET all active instructors
router.get('/instructors/active', (req, res) => { adminController.getActiveInstructors(req, res) });

// PATCH to update active status of an instructor by instructorId
router.patch('/instructors/active/:instructorId', (req, res) => { adminController.updateInstructorActiveStatus(req, res) });

// POST to add a new instructor
router.post('/instructors', (req, res) => { adminController.addInstructor(req, res) });

// PUT to update an instructor by id
router.put('/instructors/:id', (req, res) => { adminController.updateInstructor(req, res) });

// DELETE an instructor by id
router.delete('/instructors/:id', (req, res) => { adminController.deleteInstructor(req, res) });

// GET instructor clearance by instructorId
router.get('/instructors/:instructorId/clearance', (req, res) => { adminController.getInstructorClearance(req, res) });

/*************************************
              Patrons
*************************************/

// GET all patrons
router.get('/patrons', (req, res) => { adminController.getPatrons(req, res) });

// GET all active patrons
router.get('/patrons/active', (req, res) => { adminController.getActivePatrons(req, res) });

// PATCH to update active status of a patron by patronId
router.patch('/patrons/active/:patronId', (req, res) => { adminController.updatePatronActiveStatus(req, res) });

// GET a patron by patronId
router.get('/patrons/:patronId', (req, res) => { adminController.getPatronByPatronId(req, res) });

// POST to add a new patron 
router.post('/patrons', (req, res) => { adminController.addPatron(req, res) });

// PUT to update a patron by id
router.put('/patrons/:id', (req, res) => { adminController.updatePatron(req, res) });

// DELETE a patron by patronId
router.delete('/patrons/:patronId', (req, res) => { adminController.deletePatron(req, res) });

// GET a patron by studentId
router.get('/patrons/students/:studentId', (req, res) => { adminController.getPatronByStudent(req, res) });

/*************************************
                Students
*************************************/

// GET all students
router.get('/students', (req, res) => { adminController.getStudents(req, res) });

// GET all active students
router.get('/students/active', (req, res) => { adminController.getActiveStudents(req, res) });

// PATCH to update active status of a student by studentId
router.patch('/students/active/:studentId', (req, res) => { adminController.updateStudentActiveStatus(req, res) });

// GET related students by studentId
router.get('/students/:studentId/related', (req, res) => { adminController.getStudentsRelatedByStudentId(req, res) });

// POST to add a new student
router.post('/students', (req, res) => { adminController.addStudent(req, res) });

// PUT to update a student by id
router.put('/students/:id', (req, res) => { adminController.updateStudent(req, res) });

// DELETE a student by id
router.delete('/students/:studentId', (req, res) => { adminController.deleteStudent(req, res) });

// GET students by patronId
router.get('/students/patron/:patronId', (req, res) => { adminController.getStudentsByPatronId(req, res) });


module.exports = router;

