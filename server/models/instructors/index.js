 /*
  * models\instructors\index.js
  * Name: InstructorModelBase
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

const BaseModel = require('../_Base');

class InstructorModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  _formatQueryParams({ instructorId, firstname, lastname, status }) {

    // Build the filter params array
    return [
      ...[ (firstname && { name: 'firstname', prefix: 'ins.', value: firstname }) ],
      ...[ (lastname && { name: 'lastname', prefix: 'ins.', value: lastname }) ],
      ...[ (instructorId && { name: 'instructor_id', prefix: 'ins.', value: instructorId }) ],
      ...[ (status !== null && status !== undefined && status !== 'all' && { name: 'active', prefix: 'ins.', value: status === 'active' ? 1 : 0 }) ],
    ].filter(Boolean);

  }

  async getInstructors(req) {

    const { search, status } = req.query;

    // Split the search parameter into firstname and lastname
    const [firstname, lastname] = search ? search.split(' ') : [null, null];

    // Format query params
    const queryParams = this._formatQueryParams({ firstname, lastname, status });
    console.log({ firstname, lastname, status }, queryParams);

    // Build WHERE clause
    const { whereClause, bindValues } = this._buildWhereClause(queryParams);

    const baseSql = `
      SELECT 
        ins.instructor_id, 
        ins.firstname,
        ins.lastname, 
        CONCAT(ins.firstname, ' ', ins.lastname) AS fullname, 
        DATE_FORMAT(ins.date_started, '%Y-%m-%d') AS date_started, 
        ins.user_id, 
        ins.address,
        ins.phone,
        ins.email,
        ins.drivers_license_number,
        ins.active,
        loc.location_id, 
        loc.address AS loc_address, 
        sch.school_id, 
        sch.school_code, 
        sch.school_name 
      FROM artventure.instructor ins
      INNER JOIN artventure.location loc
        ON ins.location_id = loc.location_id
      INNER JOIN artventure.school sch
        ON loc.school_id = sch.school_id
    `;

    const sql = `${baseSql} ${whereClause}`;
    console.log(sql);

    try {
      const { results } = await this.query(sql, bindValues);

      //console.log('results...', results);
      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async getInstructorById(instructorId) {
    /*try {
      const query = 'SELECT * FROM instructors WHERE id = ?';
      const instructor = await this.queryAsync(query, [instructorId]);
      return instructor[0];
    } catch (error) {
      throw error;
    }*/
  }

  // Other methods...
}

module.exports = InstructorModelBase;

