/*
* models\Clients\index.js
* Name: ClientModelBase
* Author: Jesse Salinas
* Date: 02/08/2024
*/

const BaseModel = require('../_Base');

class ClientModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  _formatQueryParams({ clientId, firstname, lastname, status }) {

    // Build the filter params array
    return [
      ...[ (firstname && { name: 'firstname', prefix: 'cli.', value: firstname }) ],
      ...[ (lastname && { name: 'lastname', prefix: 'cli.', value: lastname }) ],
      ...[ (clientId && { name: 'client_id', prefix: 'cli.', value: clientId }) ],
      ...[ (status !== null && status !== undefined && status !== 'all' && { name: 'active', prefix: 'cli.', value: status === 'active' ? 1 : 0 }) ],
    ].filter(Boolean);

  }

  _getClientsBaseQuery() {

    return `
      SELECT 
        cli.client_id, 
        cli.firstname,
        cli.lastname, 
        CONCAT(cli.firstname, ' ', cli.lastname) AS fullname, 
        DATE_FORMAT(cli.date_started, '%Y-%m-%d') AS date_started, 
        cli.user_id, 
        cli.address,
        cli.phone,
        cli.email,
        cli.active,
        cli.notes,
        loc.location_id, 
        loc.address AS loc_address, 
        sch.school_id, 
        sch.school_code, 
        sch.school_name 
      FROM artventure.client cli
      INNER JOIN artventure.location loc
        ON cli.location_id = loc.location_id
      INNER JOIN artventure.school sch
        ON loc.school_id = sch.school_id
    `;

  }

  async getClients(req) {

    const { search, status } = req.query;

    // Split the search parameter into firstname and lastname
    const [ firstname, lastname ] = search ? search.split(' ') : [ null, null ];

    // Format query params
    const queryParams = this._formatQueryParams({ 
      firstname, 
      lastname, 
      status 
    });

    //console.log({ firstname, lastname, status }, queryParams);

    // Build WHERE clause
    const { whereClause, bindValues } = this._buildWhereClause(queryParams);

    const baseSql = this._getClientsBaseQuery();

    const sql = `${baseSql} ${whereClause}`;
    //console.log(sql);

    try {
      const { results } = await this.query(sql, bindValues);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async getActiveClients(req) {

    console.log('get active clients...');
    const sql = `
      SELECT 
        client_id, 
        firstname,
        lastname, 
        CONCAT(firstname, ' ', lastname) AS fullname
      FROM artventure.client
      WHERE active = 1;
    `;

    try {
      const { results } = await this.query(sql);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }


  async getClientByClientId({ clientId }) {

    const baseSql = this._getClientsBaseQuery();
    const whereClause = `WHERE cli.active = 1 AND cli.client_id = ?`;

    const sql = `${baseSql} ${whereClause}`;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([ clientId ]));
      console.log(results);

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }
  }

}

module.exports = ClientModelBase;

