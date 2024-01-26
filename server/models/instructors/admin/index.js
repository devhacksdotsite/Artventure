 /*
  * models\instructors\admin\index.js
  * Name: InstructorModelAdmin
  * Author: Jesse Salinas
  * Date: 11/11/2023
*/

const InstructorModelBase = require('../');

class InstructorModelAdmin extends InstructorModelBase {
  constructor() {
    super(); // call the constructor parent class
  }

  async addInstructor(params) {

    console.log('the payload is: ', params);
    params.locationId = 1;

    const sql = `
      INSERT INTO artventure.instructor (
        firstname, 
        lastname, 
        date_started, 
        drivers_license_number,
        phone,
        email,
        address,
        location_id 
      ) VALUES (?,?,?,?,?,?,?,?)
    `;

    console.log(params);

    try {
      const { results } = await this.query(sql, [params.firstname, params.lastname, params.dateStarted, params.dln, params.phone, params.email, params.address, params.locationId]);

      console.log('res', results);
      /*
        ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 2,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0
      */

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

}

module.exports = InstructorModelAdmin;


