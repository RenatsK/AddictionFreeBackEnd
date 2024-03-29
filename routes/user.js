const express = require('express');
const user = express.Router();
const db = require('../db/dbConn');

user.get("/userByEmail", (req, res) => {
    const { email } = req.query;
    const query = `
    SELECT u.*, a.type
    FROM User u, Addiction a
    WHERE Email = ? AND
    u.AddictionID = a.AddictionID
    `;
  
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

  user.get("/userNameByEmail", (req, res) => {
    const { email } = req.query;
    const query = `
    SELECT u.*, a.type
    FROM User u, Addiction a
    WHERE Email = ?
    `;
  
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
    const {addictionReason, email, AddictionID, addictionStartDate } = req.body;
    const sqlReason = 'UPDATE User SET Reason = ?, AddictionID = ?, StartDate = ? WHERE Email = ?';
    db.query(sqlReason, [addictionReason, AddictionID, addictionStartDate, email ], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Error inserting reason', error: err.message });
        } else {
            res.status(200).json({ success: true, message: 'Success' });
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

user.post("/stopwatchUpdate", (req, res) => {
    const { email, currentDateTime } = req.body;
    const sqlReason = 'UPDATE User SET StartDate = ? WHERE Email = ?';
    db.query(sqlReason, [currentDateTime, email ], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Error inserting reason', error: err.message });
        } else {
            res.status(200).json({ message: 'Inserting successful' });
        }
    });
});
module.exports = user;