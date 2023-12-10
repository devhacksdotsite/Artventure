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

