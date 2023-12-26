const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const db = require('dbConn');

const app = express();
const port = 38111;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  const sql = 'INSERT INTO User (name, surname, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, surname, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ message: 'Error registering user', error: err.message });
    } else {
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});