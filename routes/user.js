const express = require('express');
const user = express.Router();
const db = require('../db/dbConn');

user.get("/userByEmail", (req, res) => {
    const { email } = req.query;
  
    const query = `SELECT * FROM User WHERE Email = ?`;
  
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

user.post("/userAddiction", (req, res) => {
    const {addictionReason, email, AddictionID } = req.body;
    const sqlReason = 'UPDATE User SET Reason = ?, AddictionID = ? WHERE Email = ?';
    db.query(sqlReason, [addictionReason, AddictionID, email], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Error inserting reason', error: err.message });
        } else {
            res.status(200).json({ message: 'Inserting successful' });
        }
    });
});

user.get("/addictionToSelect", (req, res) => {

  const query = 'SELECT * FROM Addiction';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: ", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    } else {
      res.json({ success: true, data: results });
    }
  });
});

module.exports = user;