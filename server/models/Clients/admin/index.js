 /*
  * models\Clients\admin\index.js
  * Name: ClientModelAdmin
  * Author: Jesse Salinas
  * Date: 02/08/2024
*/

const ClientModelBase = require('../');

class ClientModelAdmin extends ClientModelBase {
  constructor() {
    super(); // call the constructor parent class
  }

  async addClient(params) {

    console.log('params...', params);

    const locationId = 1;

    const sql = `
      INSERT INTO artventure.client (
        firstname, 
        lastname, 
        date_started, 
        phone,
        email,
        address,
        location_id 
      ) VALUES (?,?,?,?,?,?,?)
    `;


    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        params.firstname, 
        params.lastname, 
        params.dateStarted, 
        params.phone, 
        params.email, 
        params.address, 
        locationId
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

  async updateClient(clientId, params) {

    // Default the location to ArtventureOC for now.
    const locationId = 1;

    const sql = `
      UPDATE artventure.client
      SET
        firstname = ?,
        lastname = ?, 
        date_started = ?, 
        phone = ?,
        email = ?,
        address = ?,
        location_id = ? 
      WHERE client_id = ?
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
        clientId
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

  async deleteClient(clientId) {

    // Deactivate client
    const sql = `
      UPDATE artventure.client
      SET
        active = 0 
      WHERE instructor_id = ?
    `;

    try {
      const { results } = await this.query(sql, [ clientId ]);

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

module.exports = ClientModelAdmin;


