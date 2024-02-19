 /*
  * models\students\index.js
  * Name: StudentModelBase
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

const BaseModel = require('../_Base');

class StudentModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  _formatQueryParams({ studentId, clientId, firstname, lastname, status }) {

    // Build the filter params array
    return [
      ...[ (firstname && { name: 'firstname', prefix: 'stu.', value: firstname }) ],
      ...[ (lastname && { name: 'lastname', prefix: 'stu.', value: lastname }) ],
      ...[ (clientId && { name: 'client_id', prefix: 'stu.', value: clientId }) ],
      ...[ (studentId && { name: 'student_id', prefix: 'stu.', value: studentId }) ],
      ...[ (status !== null && status !== undefined && status !== 'all' && { name: 'active', prefix: 'stu.', value: status === 'active' ? 1 : 0 }) ],
    ].filter(Boolean);

  }

  async getStudents(req, clientId = null) {

    const { search, status } = req.query || {};

    // Split the search parameter into firstname and lastname
    const [ firstname, lastname ] = search ? search.split(' ') : [ null, null ];

    // Format query params
    const queryParams = this._formatQueryParams({ firstname, lastname, status, clientId });
    console.log({ firstname, lastname, status }, queryParams);

    // Build WHERE clause
    const { whereClause, bindValues } = this._buildWhereClause(queryParams);

    const baseSql = `
      SELECT 
        stu.student_id, 
        stu.client_id, 
        stu.firstname,
        stu.lastname, 
        CONCAT(stu.firstname, ' ', stu.lastname) AS fullname, 
        DATE_FORMAT(stu.date_started, '%Y-%m-%d') AS date_started, 
        DATE_FORMAT(stu.birthdate, '%Y-%m-%d') AS birthdate, 
        stu.active,
        loc.location_id, 
        loc.address AS loc_address, 
        sch.school_id, 
        sch.school_code, 
        sch.school_name 
      FROM artventure.student stu 
      INNER JOIN artventure.location loc
        ON stu.location_id = loc.location_id
      INNER JOIN artventure.school sch
        ON loc.school_id = sch.school_id
    `;

    const sql = `${baseSql} ${whereClause}`;
    console.log(sql);

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

  async getStudentsByClient(req, clientId) {

    return await this.getStudents(req, clientId);
  }
}

module.exports = StudentModelBase;

