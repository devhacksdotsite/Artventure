 /*
  * models\instructors\index.js
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

const BaseModel = require('../_Base');

class InstructorModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  async getInstructors() {
    const sql = `
      SELECT 
        ins.instructor_id, 
        ins.instructor_name, 
        ins.birthdate, 
        ins.date_started, 
        ins.user_id, 
        loc.address, 
        sch.school_id, 
        sch.school_code, 
        sch.school_name 
      FROM artventure.instructor ins
      INNER JOIN artventure.location loc
        ON ins.location_id = loc.location_id
      INNER JOIN artventure.school sch
        ON loc.school_id = sch.school_id;
    `;

    try {
      const { results } = await this.query(sql);

      console.log('results...', results);
      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }



    /*return [
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
    ];*/
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

module.exports = InstructorModelBase;

