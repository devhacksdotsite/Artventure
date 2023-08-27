//const Instructor = require('../models/instructorModel');

exports.getAdminDashboard = (req, res) => {
  // Admin-specific logic for the dashboard
};

exports.getAdminInstructors = (req, res) => {
  //const instructors = Instructor.getAll();
  //res.json(instructors);

  return res.json('sup from the adminController');
};

