const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'codeigniter',
  password: 'codeigniter2019',
  database: 'SISIII2024_76230035',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;