/*
* @\models\students\admin\index.js
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
        patron_id,
        date_started, 
        birthdate, 
        location_id,
        notes
      ) VALUES (?,?,?,?,?,?,?)
    `;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.patronId,
        params.dateStarted, 
        params.birthdate, 
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
        patron_id = ?,
        date_started = ?, 
        birthdate = ?, 
        location_id = ?,
        notes = ?
      WHERE student_id = ?
    `;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.patronId, 
        params.dateStarted, 
        params.birthdate, 
        locationId, 
        params.notes,
        studentId
      ]));

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async deleteStudent(studentId) {

    // Deactivate student
    const sql = `
      UPDATE artventure.student
      SET
        active = 0 
      WHERE student_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ studentId ]);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async updateStudentActiveStatus(studentId) {

    // Reactivate student
    const sql = `
      UPDATE artventure.student
      SET
        active = 1 
      WHERE student_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ studentId ]);

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


