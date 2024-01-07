const express = require('express');
const register = express.Router();
const db = require('../db/dbConn');

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

register.post('/check-email', (req, res) => {
  const { email } = req.body;

  const sql = 'SELECT * FROM User WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      res.status(500).json({ message: 'Error checking email', error: err.message });
    } else {
      if (result.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    }
  });
});

module.exports = register;