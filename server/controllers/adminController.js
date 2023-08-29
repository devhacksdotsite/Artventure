 /*
  * controllers\adminController.js
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

const Instructor = require('../models/instructors/index.js');

exports.getAdminDashboard = (req, res) => {
  // Admin-specific logic for the dashboard
};

exports.getAdminInstructors = (req, res) => {
  const instructors = Instructor.getAll();

  return res.json({
    status: 'sucess',
    instructors,
  });
};

