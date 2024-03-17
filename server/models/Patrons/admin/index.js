/*
* @\models\Patrons\admin\index.js
* Name: PatronModelAdmin
* Author: Jesse Salinas
* Date: 02/08/2024
*/

const PatronModelBase = require('../');

class PatronModelAdmin extends PatronModelBase {
  constructor() {
    super(); // call the constructor parent class
  }

  async addPatron(params) {

    const locationId = 1;

    const sql = `
      INSERT INTO artventure.patron (
        firstname, 
        lastname, 
        date_started, 
        phone,
        email,
        address,
        location_id,
        notes
      ) VALUES (?,?,?,?,?,?,?,?)
    `;


    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.dateStarted, 
        params.phone, 
        params.email, 
        params.address, 
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

  async updatePatron(patronId, params) {

    // Default the location to ArtventureOC for now.
    const locationId = 1;

    const sql = `
      UPDATE artventure.patron
      SET
        firstname = ?,
        lastname = ?, 
        date_started = ?, 
        phone = ?,
        email = ?,
        address = ?,
        location_id = ?,
        notes = ?
      WHERE patron_id = ?
    `;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.dateStarted, 
        params.phone, 
        params.email, 
        params.address, 
        locationId, 
        params.notes,
        patronId
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

  async deletePatron(patronId) {

    // Deactivate patron 
    const sql = `
      UPDATE artventure.patron
      SET
        active = 0 
      WHERE patron_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ patronId ]);

      console.log('res', results);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async updatePatronActiveStatus(patronId) {

    // Deactivate patron 
    const sql = `
      UPDATE artventure.patron
      SET
        active = 1 
      WHERE patron_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ patronId ]);

      console.log('res', results);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

}

module.exports = PatronModelAdmin;


