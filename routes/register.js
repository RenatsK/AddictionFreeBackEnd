const express = require('express');
const register = express.Router();
const db = require('../db/dbConn');

// '/' is like index. It is possible to add someting after '/' so it could be in a link in a web browser 
register.post('/', (req, res) => {
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

module.exports = register;