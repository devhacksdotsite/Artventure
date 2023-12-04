const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'art_dev',
  password: '2023Artventure%%%',
  database: 'artventure',
  connectionLimit: 10,
};

const connectionPool = mysql.createPool(dbConfig);

module.exports = connectionPool;

