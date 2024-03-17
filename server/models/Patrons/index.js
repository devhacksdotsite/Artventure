/*
* @\models\Patrons\index.js
* Name: PatronModelBase
* Author: Jesse Salinas
* Date: 02/08/2024
*/

const BaseModel = require('../_Base');

class PatronModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  _formatQueryParams({ patronId, firstname, lastname, status }) {

    // Build the filter params array
    return [
      ...[ (firstname && { name: 'firstname', prefix: 'pat.', value: firstname }) ],
      ...[ (lastname && { name: 'lastname', prefix: 'pat.', value: lastname }) ],
      ...[ (patronId && { name: 'patron_id', prefix: 'pat.', value: patronId }) ],
      ...[ (status !== null && status !== undefined && status !== 'all' && { name: 'active', prefix: 'pat.', value: status === 'active' ? 1 : 0 }) ],
    ].filter(Boolean);

  }

  _getPatronsBaseQuery() {

    return `
      SELECT 
        pat.patron_id, 
        pat.firstname,
        pat.lastname, 
        CONCAT(pat.firstname, ' ', pat.lastname) AS fullname, 
        DATE_FORMAT(pat.date_started, '%Y-%m-%d') AS date_started, 
        pat.user_id, 
        pat.address,
        pat.phone,
        pat.email,
        pat.active,
        pat.notes,
        loc.location_id, 
        loc.address AS loc_address, 
        sch.school_id, 
        sch.school_code, 
        sch.school_name 
      FROM artventure.patron pat 
      INNER JOIN artventure.location loc
        ON pat.location_id = loc.location_id
      INNER JOIN artventure.school sch
        ON loc.school_id = sch.school_id
    `;

  }

  async getPatrons(req) {

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

    const baseSql = this._getPatronsBaseQuery();

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

  async getActivePatrons(req) {

    const sql = `
      SELECT 
        patron_id, 
        firstname,
        lastname, 
        CONCAT(firstname, ' ', lastname) AS fullname
      FROM artventure.patron
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


  async getPatronByPatronId({ patronId }) {

    const baseSql = this._getPatronsBaseQuery();
    const whereClause = `WHERE pat.active = 1 AND pat.patron_id = ?`;

    const sql = `${baseSql} ${whereClause}`;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([ patronId ]));
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

module.exports = PatronModelBase;

