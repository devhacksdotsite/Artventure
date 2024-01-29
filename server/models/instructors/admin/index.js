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

    console.log('params...', params);

    const locationId = 1;

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


    try {
      const { results } = await this.query(sql, [params.firstname, params.lastname, params.dateStarted, params.dln, params.phone, params.email, params.address, locationId]);

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

  async updateInstructor(instructorId, params) {

    // Default the location to ArtventureOC for now.
    const locationId = 1;

    const sql = `
      UPDATE artventure.instructor
      SET
        firstname = ?,
        lastname = ?, 
        date_started = ?, 
        drivers_license_number = ?,
        phone = ?,
        email = ?,
        address = ?,
        location_id = ? 
      WHERE instructor_id = ?
    `;

    try {
      const { results } = await this.query(sql, [params.firstname, params.lastname, params.dateStarted, params.dln, params.phone, params.email, params.address, locationId, instructorId]);

      console.log('res', results);
      /*ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1
      }*/

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async deleteInstructor(instructorId) {

    // Deactivate instructor
    const sql = `
      UPDATE artventure.instructor
      SET
        active = 0 
      WHERE instructor_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ instructorId ]);

      console.log('res', results);
      /*ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1
      }*/

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


