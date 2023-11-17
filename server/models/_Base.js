 /*
  * models\_Base.js
  * Name: BaseModel
  * Author: Jesse Salinas
  * Date: 11/11/2023
*/

const mysql = require('mysql2');

class BaseModel {
  constructor() {
    this.connection = null;
    //this.setupConnection();
  }

  async setupConnection() {
    try {
      /*this.connection = await mysql.createConnection({
        // MySQL connection configuration, switch me to use an .env
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'your_database',
      });*/
    } catch (error) {
      console.error('Error setting up database connection:', error);
      throw error;
    }
  }

  async query(sql, params) {
    try {
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}

module.exports = BaseModel;

