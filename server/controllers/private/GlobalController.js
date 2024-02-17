 /*
  * controllers\private\GlobalController.js
  * Name: GlobalController
  * Author: Jesse Salinas
  * Date: 02/11/2024
*/

class GlobalController {
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

    console.log(instructors);

    return res.json({
      status: 'success',
      instructors,
    });   
  }
}

module.exports = GlobalController;

