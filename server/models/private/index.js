 /*
  * models\private\index.js
  * Name: PrivateModel
  * Author: Jesse Salinas
  * Date: 02/11/2024
*/

const BaseModel = require('../_Base');

class PrivateModel extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  async getActiveClients(req) {

    const sql = `
      SELECT 
        client_id, 
        firstname,
        lastname, 
        CONCAT(firstname, ' ', lastname) AS fullname
      FROM artventure.client
      WHERE active=?
    `;

    try {
      const { results } = await this.query(sql, [ 1 ]);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }


  // Other methods...
}

module.exports = PrivateModel;

