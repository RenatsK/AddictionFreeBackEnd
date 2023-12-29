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
    const {addictionReason, email } = req.body;
    const sqlReason = 'UPDATE User SET Reason = ? WHERE Email = ?';
    db.query(sqlReason, [addictionReason, email], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Error inserting reason', error: err.message });
        } else {
            res.status(200).json({ message: 'Inserting successful' });
        }
    })
})

module.exports = user;