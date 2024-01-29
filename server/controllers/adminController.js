 /*
  * controllers\adminController.js
  * Name: AdminController
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

class AdminController {
  constructor(studentModel, instructorModel) {
    this.studentModel = studentModel;
    this.instructorModel = instructorModel;
  }

  async getInstructors(req, res) {
    const instructors = await this.instructorModel.getInstructors();

    console.log(instructors);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async addInstructor(req, res) {
    console.log('ADD...');
    const payload = req.body;

    const response = await this.instructorModel.addInstructor(payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors();

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async updateInstructor(req, res) {

    console.log('UPDATE...');
    const instructorId = req.params.id;
    const payload = req.body;

    const response = await this.instructorModel.updateInstructor(instructorId, payload);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors();

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  async deleteInstructor(req, res) {

    console.log('DELETE...');
    const instructorId = req.params.id;

    const response = await this.instructorModel.deleteInstructor(instructorId);

    // NOTE: If multiple DB instances (reader, writer) will need to read from the writer instance since reader may take a few seconds to update; hence, data might not be available.
    const instructors = await this.instructorModel.getInstructors();

    return res.json({
      status: 'success',
      instructors,
    }); 
  }

}

module.exports = AdminController;

