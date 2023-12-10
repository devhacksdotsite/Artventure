const mysql = require('mysql2');

// Replace these with your actual database connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql_password',
  database: 'artventure',
});

console.log(connection);
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

