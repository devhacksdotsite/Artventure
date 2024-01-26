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
        ins.firstname,
        ins.lastname, 
        CONCAT(ins.firstname, ' ', ins.lastname) AS fullname, 
        DATE_FORMAT(ins.date_started, '%Y-%m-%d') AS date_started, 
        ins.user_id, 
        ins.address,
        ins.phone,
        ins.email,
        ins.drivers_license_number,
        loc.location_id, 
        loc.address AS loc_address, 
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

