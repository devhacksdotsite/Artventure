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
const ClientModel = require('../../../models/clients/admin/');
const StudentModel = require('../../../models/students/admin/');
const InstructorModel = require('../../../models/instructors/admin/');

// Instantiate Models
const clientModel = new ClientModel();
const studentModel = new StudentModel();
const instructorModel = new InstructorModel();

// Instantiate Controller, use dependency injection
const adminController = new AdminController(clientModel, studentModel, instructorModel);

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
              Clients
*************************************/

// GET all clients
router.get('/clients', (req, res) => { adminController.getClients(req, res) });

// GET all active clients
router.get('/clients/active', (req, res) => { adminController.getActiveClients(req, res) });

// PATCH to update active status of a client by clientId
router.patch('/clients/active/:clientId', (req, res) => { adminController.updateClientActiveStatus(req, res) });

// GET a client by clientId
router.get('/clients/:clientId', (req, res) => { adminController.getClientByClientId(req, res) });

// POST to add a new client
router.post('/clients', (req, res) => { adminController.addClient(req, res) });

// PUT to update a client by id
router.put('/clients/:id', (req, res) => { adminController.updateClient(req, res) });

// DELETE a client by clientId
router.delete('/clients/:clientId', (req, res) => { adminController.deleteClient(req, res) });

// GET a client by studentId
router.get('/clients/students/:studentId', (req, res) => { adminController.getClientByStudent(req, res) });

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

// GET students by clientId
router.get('/students/client/:clientId', (req, res) => { adminController.getStudentsByClientId(req, res) });



module.exports = router;

