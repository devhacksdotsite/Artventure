 /*
  * models\_Base.js
  * Name: BaseModel
  * Author: Jesse Salinas
  * Date: 11/11/2023
*/

//const connectionPool = require('../config/dbConnection');
const mysql = require('mysql2');

class BaseModel {

  async query(sql, params) {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'art_dev',
      password: '2023Artventure%%%',
      database: 'artventure',
    });

    // Attempt to connect to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
      }

      console.log('Connected to MySQL!');

      // Perform a simple query to fetch a user
      connection.query('SELECT * FROM artventure.user LIMIT 1', (queryErr, results) => {
        if (queryErr) {
          console.error('Error querying MySQL:', queryErr);
          return;
        }

        // Display the fetched user
        const user = results[0];
        console.log('Fetched user:', user);

        // Close the connection after testing
        connection.end((endErr) => {
          if (endErr) {
            console.error('Error closing MySQL connection:', endErr);
            return;
          }
          console.log('Connection closed.');
        });
      });
    });

  }
}

module.exports = BaseModel;

