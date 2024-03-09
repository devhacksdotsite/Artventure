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
router.get('/instructors', (req, res) => adminController.getInstructors(req, res));
router.post('/instructors', (req, res) => adminController.addInstructor(req, res));
router.put('/instructors/:id', (req, res) => adminController.updateInstructor(req, res));
router.delete('/instructors/:id', (req, res) => adminController.deleteInstructor(req, res));

router.get('/instructors/:instructorId/clearance', (req, res) => adminController.getInstructorClearance(req, res));

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
router.get('/students', (req, res) => adminController.getStudents(req, res));
router.get('/students/:studentId/related', (req, res) => adminController.getStudentsRelatedByStudentId(req, res));
router.post('/students', (req, res) => adminController.addStudent(req, res));
router.put('/students/:id', (req, res) => adminController.updateStudent(req, res));
router.delete('/students/:id', (req, res) => adminController.deleteStudent(req, res));

router.get('/students/client/:clientId', (req, res) => adminController.getStudentsByClientId(req, res));

module.exports = router;

