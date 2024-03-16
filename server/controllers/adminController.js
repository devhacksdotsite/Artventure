/*
* controllers\adminController.js
* Name: AdminController
* Author: Jesse Salinas
* Date: 08/27/2023
*/

class AdminController {
  constructor(clientModel, studentModel, instructorModel) {
    this.clientModel = clientModel;
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
                  Clients
  *************************************/
  async getClients(req, res) {
    const clients = await this.clientModel.getClients(req);

    return res.json({
      status: 'success',
      clients,
    });   
  }

  async getActiveClients(req, res) {

    const clients = await this.clientModel.getActiveClients(req);

    return res.json({
      status: 'success',
      clients,
    });   
  }

  async getClientByClientId(req, res) {

    const clientId = req.params.clientId;

    const client = await this.clientModel.getClientByClientId({ clientId });

    return res.json({
      status: 'success',
      client,
    });   
  }

  async addClient(req, res) {
    const payload = req.body;

    const response = await this.clientModel.addClient(payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const clients = await this.clientModel.getClients(req);

    return res.json({
      status: 'success',
      clients
    });   
  }

  async updateClient(req, res) {

    const clientId = req.params.id;
    const payload = req.body;

    const response = await this.clientModel.updateClient(clientId, payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const clients = await this.clientModel.getClients(req);

    return res.json({
      status: 'success',
      clients,
    });   
  }

  async deleteClient(req, res) {

    const clientId = req.params.clientId;

    const response = await this.clientModel.deleteClient(clientId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const clients = await this.clientModel.getClients(req) || [];

    return res.json({
      status: 'success',
      clients,
    }); 
  }

  async updateClientActiveStatus(req, res) {

    const clientId = req.params.clientId;

    const response = await this.clientModel.updateClientActiveStatus(clientId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const clients = await this.clientModel.getClients(req) || [];

    return res.json({
      status: 'success',
      clients,
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

  async getStudentsByClientId(req, res) {
    const clientId = req.params.clientId;

    const students = await this.studentModel.getStudentsByClientId({ req, clientId });

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

