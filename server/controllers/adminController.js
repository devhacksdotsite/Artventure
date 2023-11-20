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

  async getAllInstructors(req, res) {
    const instructors = await this.instructorModel.getAllInstructors();
    console.log(instructors);

    return res.json({
      status: 'success',
      instructors,
    });   
  }

  // Other methods...
}

module.exports = AdminController;

