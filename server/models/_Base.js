/*
* models\_Base.js
* Name: BaseModel
* Author: Jesse Salinas
* Date: 11/11/2023
*/

const mysql = require('mysql2/promise');

// MySQL connection configuration, switch me to use an .env
const conf = {
  host: 'mysql', // NOTE: hostname needs to be set to what the service is named in docker.
  user: 'root',
  password: 'mysql_password',
  database: 'artventure',
}

class BaseModel {
  constructor(config = conf) {
    this.connection = this.setupConnection(config);
  }

  _cleanParamValues(values) {

    if (!Array.isArray(values)) {

        return (values && typeof values === 'string') ? values.trim() : values;
    }

    return values.map(value => {

        if (value === undefined) {
            return null;
        }

        return (value && typeof value === 'string') ? value.trim() : value;
    });
  }

  _formatQueryParams(params) {
  
    // General Query formatter override at lower classes for more control
    return 'Coming soon';
  }

  _buildWhereClause(params) {

    // Build Where Clause
    const conditions = params.map(param => {
      return param.value !== null && param.value !== undefined
        ? `${param.prefix}${param.name} = ?`
        : null;
    }).filter(Boolean);

    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` : '';

    // Bind param values
    const bindValues = params.filter(param => param.value !== null && param.value !== undefined)
      .map(param => this._cleanParamValues(param.value));

    return { whereClause, bindValues };

  }

  async setupConnection(config) {
    try {

      // Create DB Conneciton
      const connection = await mysql.createConnection(config);

      console.log('Connected to MySQL database');

      // Await and return the connection.
      return connection;

    } catch (error) {

      console.error('Error setting up database connection:', error);
      throw error;
      process.exit(1); // Exit the process if the connection setup fails
    }
  }

  async query(sql, params) {
    console.log('params', params);
    try {

      // DB Connection
      const conn = await this.connection;

      // Deconstruct the results and DB fields
      const [ results, fields ] = await conn.execute(sql, params);

      // Connection is automatically closed
      console.log('Connection closed.');

      // return results and DB fields
      return { results, fields };

    } catch (error) {
      console.error('Oops something went wrong: ', error);
      throw error;
    }
  }
}

module.exports = BaseModel;

