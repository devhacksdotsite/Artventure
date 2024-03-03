 /*
  * models\students\admin\index.js
  * Name: StudentModelAdmin
  * Author: Jesse Salinas
  * Date: 02/05/2024
*/

const StudentModelBase = require('../');

class StudentModelAdmin extends StudentModelBase {
  constructor() {
    super(); // call the constructor parent class
  }

  async addStudent(params) {

    // Default to ArtventureOC location for now...
    const locationId = 1;

    const sql = `
      INSERT INTO artventure.student (
        firstname, 
        lastname, 
        client_id,
        date_started, 
        location_id,
        notes
      ) VALUES (?,?,?,?,?,?)
    `;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.clientId,
        params.dateStarted, 
        locationId,
        params.notes
      ]));

      console.log('res', results);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async updateStudent(studentId, params) {

    // Default the location to ArtventureOC for now.
    const locationId = 1;

    const sql = `
      UPDATE artventure.student
      SET
        firstname = ?,
        lastname = ?, 
        client_id = ?,
        date_started = ?, 
        location_id = ?,
        notes = ?
      WHERE student_id = ?
    `;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.clientId, 
        params.dateStarted, 
        locationId, 
        params.notes,
        studentId
      ]));

      console.log('res', results);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async deleteStudent(instructorId) {

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

module.exports = StudentModelAdmin;


 
