/*
* @\models\instructors\admin\index.js
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

    //console.log('params...', params);

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
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.dateStarted, 
        params.dln, 
        params.phone, 
        params.email, 
        params.address, 
        locationId
      ]));

      //console.log('res', results);
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

      if (!results.affectedRows) {
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
      const { results } = await this.query(sql, this._cleanParamValues([params.firstname, params.lastname, params.dateStarted, params.dln, params.phone, params.email, params.address, locationId, instructorId]));

      //console.log('res', results);
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

  async updateInstructorActiveStatus(instructorId) {

    // Reactivate student
    const sql = `
      UPDATE artventure.instructor
      SET
        active = 1 
      WHERE instructor_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ instructorId ]);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async getInstructorClearance(instructorId, status = 'active') {

    let sql = `
      SELECT *
      FROM artventure.instructor_clearance
      WHERE instructor_id = ?
    `;

    if (status === 'active') {

      sql += ' AND active = 1';

    } else if (status === 'inactive') {

      sql += ' AND active = 0';
    }

    try {
      const { results } = await this.query(sql, this._cleanParamValues([ instructorId ]));

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async addInstructorClearance(instructorId, params) {

    // Prepare an array to store the clearance entries
    const clearanceEntries = this._clearanceEntries(instructorId, params);

    // Insert the clearance entries into the database
    if (clearanceEntries.length > 0) {

      await Promise.all(clearanceEntries.map(async (entry) => {

        const sql = `
          INSERT INTO artventure.instructor_clearance (
            instructor_id,
            clearance_type,
            document_path
          ) VALUES (?,?,?)
        `;

        try {
          const { results } = await this.query(sql, this._cleanParamValues([
            entry.instructor_id,
            entry.clearance_type,
            entry.clearance_path
          ]));

          //console.log('res', results);

          if (!results.affectedRows) {
            return;
          }

          return results;

        } catch (error) {
      
          throw error;
        }
        
      }));
    }
  }

  async updateInstructorClearance(instructorId, params) {

    // Check if fingerPrinted or backgroundChecked fields are present in the payload
    const { fingerPrinted, backgroundChecked } = params;

    // Get existing clearance entries for the instructor
    const existingClearance = await this.getInstructorClearance(instructorId, 'all');

    console.log({ existingClearance });

    // Finger Printed
    const existingFingerPrinted = existingClearance.find(entry => entry.clearance_type === 'fingerprint');

    if (fingerPrinted) {

      if (existingFingerPrinted) {

        // Reactivate existing entry if it's "deleted"
        if (existingFingerPrinted.active === 0) {

          console.log('Reactivate fingerprint clearance entry...');
          //await this.updateInstructorClearance(existingFingerPrinted.clearance_id);
        }

        console.log('Do nothing!!!!');

      } else {

        console.log('Add new fingerprint clearance entry...');
        // Add new entry for fingerPrinted
        //await this.addInstructorClearance(instructorId, 'fingerprint');
      }
    } else if (!fingerPrinted && existingFingerPrinted) {

      console.log('Delete fingerprint clearance entry...');
      // Delete existing entry for fingerPrinted if payload value is false
      //await this.deleteInstructorClearance(existingFingerPrinted.clearance_id);
    }

    // Background Check
    const existingBackgroundChecked = existingClearance.find(entry => entry.clearance_type === 'background_check');

    console.log(existingBackgroundChecked);
    if (backgroundChecked) {

      if (existingBackgroundChecked) {

        // Reactivate existing entry if it's "deleted"
        if (existingBackgroundChecked.active === 0) {

          console.log('Reactivate background_check clearance entry...');
          //await this.updateInstructorClearance(existingFingerPrinted.clearance_id);
        }

        console.log('Do nothing!!!!');

      } else {

        console.log('Add new background_check clearance entry...');
        // Add new entry for fingerPrinted
        //await this.addInstructorClearance(instructorId, 'fingerprint');
      }
    } else if (!backgroundChecked && existingBackgroundChecked) {

      console.log('Delete background_check clearance entry...');
      // Delete existing entry for fingerPrinted if payload value is false
      //await this.deleteInstructorClearance(existingFingerPrinted.clearance_id);
    }

  }

}

module.exports = InstructorModelAdmin;


