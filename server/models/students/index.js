/*
* @\models\students\index.js
* Name: StudentModelBase
* Author: Jesse Salinas
* Date: 08/27/2023
*/

const BaseModel = require('../_Base');

class StudentModelBase extends BaseModel {

  constructor() {
    super(); // call the constructor parent class
  }

  _formatQueryParams({ studentId, patronId, firstname, lastname, status }) {

    // Build the filter params array
    return [
      ...[ (firstname && { name: 'firstname', prefix: 'stu.', value: firstname }) ],
      ...[ (lastname && { name: 'lastname', prefix: 'stu.', value: lastname }) ],
      ...[ (patronId && { name: 'patron_id', prefix: 'stu.', value: patronId }) ],
      ...[ (studentId && { name: 'student_id', prefix: 'stu.', value: studentId }) ],
      ...[ (status !== null && status !== undefined && status !== 'all' && { name: 'active', prefix: 'stu.', value: status === 'active' ? 1 : 0 }) ],
    ].filter(Boolean);

  }

  _getStudentsBaseQuery() {

    return `
      SELECT 
        stu.student_id, 
        stu.patron_id, 
        stu.firstname,
        stu.lastname, 
        stu.notes, 
        CONCAT(stu.firstname, ' ', stu.lastname) AS fullname, 
        DATE_FORMAT(stu.date_started, '%Y-%m-%d') AS date_started, 
        DATE_FORMAT(stu.birthdate, '%Y-%m-%d') AS birthdate, 
        TIMESTAMPDIFF(YEAR, stu.birthdate, CURDATE()) AS age,
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
  }

  async getStudents(req) {

    const { search, status } = req.query || {};

    // Split the search parameter into firstname and lastname
    const [ firstname, lastname ] = search ? search.split(' ') : [ null, null ];

    // Format query params
    const queryParams = this._formatQueryParams({ firstname, lastname, status });
    console.log({ firstname, lastname, status }, queryParams);

    // Build WHERE clause
    const { whereClause, bindValues } = this._buildWhereClause(queryParams);

    const baseSql = this._getStudentsBaseQuery();

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

  async getStudentsByPatronId({ req, patronId }) {

    const baseSql = this._getStudentsBaseQuery();
    const whereClause = `WHERE stu.active = 1 AND stu.patron_id = ?`;

    const sql = `${baseSql} ${whereClause}`;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([ patronId ]));

      if (!results.length) {
        return;
      }

      return results;

    } catch (error) {
  
      throw error;
    }

  }

  async getStudentsRelatedByStudentId({ req, studentId }) {

    const { patronId } = req.query || {};
    
    const baseSql = this._getStudentsBaseQuery();
    const whereClause = `WHERE stu.active = 1 AND stu.patron_id = ? AND stu.student_id <> ?`;

    const sql = `${baseSql} ${whereClause}`;

    try {
      const { results } = await this.query(sql, this._cleanParamValues([
        patronId, 
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

  async getActiveStudents(req) {

    const sql = `
      SELECT 
        student_id, 
        firstname,
        lastname, 
        CONCAT(firstname, ' ', lastname) AS fullname
      FROM artventure.student
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

}

module.exports = StudentModelBase;

