 /*
  * models\students\index.js
  * Name: StudentModelBase
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

const BaseModel = require('../_Base');

class StudentModelBase extends BaseModel {
  /*constructor() {
    // super base ...
  }*/

  async getAllStudents() {
    /*try {
      const query = 'SELECT * FROM instructors';
      const instructors = await this.queryAsync(query);
      return instructors;
    } catch (error) {
      throw error;
    }*/

    return [
      {
        id: '2353JD343',
        fullname: 'Mindy Shafer',
        location: 'Artventure - Laguna Niguel',
        address: '30902 Clubhouse Dr, Laguna Niguel CA 92677',
        phone: '(949) 859-7984'
      }, {
        id: '3431F343D',
        fullname: 'Cindy Trevor',
        location: 'Artventure - Laguna Niguel',
        address: '67 Bentwood Ln, Aliso Viejo CA 92656',
        phone: '(714) 393-7984'
      },
      {
        id: '5631F843K',
        fullname: 'Monika Rivera',
        location: 'Artventure - Laguna Beach',
        address: '27975 Mazagon, Mission Viejo Ca, 92659',
        phone: '(714) 345-2234'
      },
    ];
  }

  async getInstructorById(instructorId) {
    /*try {
      const query = 'SELECT * FROM instructors WHERE id = ?';
      const instructor = await this.queryAsync(query, [instructorId]);
      return instructor[0];
    } catch (error) {
      throw error;
    }*/
  }

  // Other methods...
}

module.exports = StudentModelBase;

