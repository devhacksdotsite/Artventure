/*
* @\controllers\adminController.js
* Name: AdminController
* Author: Jesse Salinas
* Date: 08/27/2023
*/

class AdminController {
  constructor(patronModel, studentModel, instructorModel) {
    this.patronModel = patronModel;
    this.studentModel = studentModel;
    this.instructorModel = instructorModel;
  }

  /*************************************
                Instructors
  *************************************/
  async getInstructors(req, res) {
    const instructors = await this.instructorModel.getInstructors(req);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async getActiveInstructors(req, res) {

    const instructors = await this.instructorModel.getActiveInstructors(req);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async addInstructor(req, res) {
    const payload = req.body;

    const response = await this.instructorModel.addInstructor(payload);

    // Add Instructor Clearance
    const instructorId = response.insertId;
    if (instructorId) {

      await this.instructorModel.addInstructorClearance(instructorId, payload);
    }

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors(req);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async updateInstructor(req, res) {
    const instructorId = req.params.id;
    const payload = req.body;

    const response = await this.instructorModel.updateInstructor(instructorId, payload);

    // Update Instructor Clearance
    if (instructorId) {

      await this.instructorModel.updateInstructorClearance(instructorId, payload);
    }

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors(req);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async deleteInstructor(req, res) {
    const instructorId = req.params.id;

    const response = await this.instructorModel.deleteInstructor(instructorId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors(req);

    return res.json({
      status: 'success',
      instructors,
    }); 
  }

  async updateInstructorActiveStatus(req, res) {

    const instructorId = req.params.instructorId;

    const response = await this.instructorModel.updateInstructorActiveStatus(instructorId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors(req) || [];

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async getInstructorClearance(req, res) {

    const instructorId = req.params.instructorId;

    const clearance = await this.instructorModel.getInstructorClearance(instructorId);

    return res.json({
      status: 'success',
      clearance,
    });   
  }

  /*************************************
                  Patrons
  *************************************/
  async getPatrons(req, res) {
    const patrons = await this.patronModel.getPatrons(req);

    return res.json({
      status: 'success',
      patrons,
    });   
  }

  async getActivePatrons(req, res) {

    const patrons = await this.patronModel.getActivePatrons(req);

    return res.json({
      status: 'success',
      patrons,
    });   
  }

  async getPatronByPatronId(req, res) {

    const patronId = req.params.patronId;

    const patron = await this.patronModel.getPatronByPatronId({ patronId });

    return res.json({
      status: 'success',
      patron,
    });   
  }

  async addPatron(req, res) {
    const payload = req.body;

    const response = await this.patronModel.addPatron(payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const patrons = await this.patronModel.getPatrons(req);

    return res.json({
      status: 'success',
      patrons
    });   
  }

  async updatePatron(req, res) {

    const patronId = req.params.id;
    const payload = req.body;

    const response = await this.patronModel.updatePatron(patronId, payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const patrons = await this.patronModel.getPatrons(req);

    return res.json({
      status: 'success',
      patrons,
    });   
  }

  async deletePatron(req, res) {

    const patronId = req.params.patronId;

    const response = await this.patronModel.deletePatron(patronId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const patrons = await this.patronModel.getPatrons(req) || [];

    return res.json({
      status: 'success',
      patrons,
    }); 
  }

  async updatePatronActiveStatus(req, res) {

    const patronId = req.params.patronId;

    const response = await this.patronModel.updatePatronActiveStatus(patronId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const patrons = await this.patronModel.getPatrons(req) || [];

    return res.json({
      status: 'success',
      patrons,
    });   
  }


  /*************************************
                Students
  *************************************/

  async getStudents(req, res) {
    const students = await this.studentModel.getStudents(req);

    return res.json({
      status: 'success',
      students,
    });   
  }

  async getActiveStudents(req, res) {

    const students = await this.studentModel.getActiveStudents(req);

    return res.json({
      status: 'success',
      students,
    });   
  }

  async addStudent(req, res) {
    const payload = req.body;

    const response = await this.studentModel.addStudent(payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const students = await this.studentModel.getStudents(req);

    return res.json({
      status: 'success',
      students
    });   
  }

  async updateStudent(req, res) {
    const studentId = req.params.id;
    const payload = req.body;

    const response = await this.studentModel.updateStudent(studentId, payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const students = await this.studentModel.getStudents(req);

    return res.json({
      status: 'success',
      students,
    });   
  }

  async deleteStudent(req, res) {

    const studentId = req.params.studentId;

    const response = await this.studentModel.deleteStudent(studentId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const students = await this.studentModel.getStudents(req) || [];

    return res.json({
      status: 'success',
      students,
    }); 
  }

  async updateStudentActiveStatus(req, res) {

    const studentId = req.params.studentId;

    const response = await this.studentModel.updateStudentActiveStatus(studentId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const students = await this.studentModel.getStudents(req) || [];

    return res.json({
      status: 'success',
      students,
    });   
  }

  async getStudentsByPatronId(req, res) {
    const patronId = req.params.patronId;

    const students = await this.studentModel.getStudentsByPatronId({ req, patronId });

    return res.json({
      status: 'success',
      students,
    });   
  }

 async getStudentsRelatedByStudentId(req, res) {
    const studentId = req.params.studentId;

    const students = await this.studentModel.getStudentsRelatedByStudentId({ req, studentId });
   
    return res.json({
      status: 'success',
      students,
    });
  }

}

module.exports = AdminController;

