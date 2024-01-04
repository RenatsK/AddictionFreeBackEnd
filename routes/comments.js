const express = require('express');
const comment = express.Router();
const db = require('../db/dbConn');

comment.get("/allComments", (req, res) => {
    const query = `SELECT * FROM Comment`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

  comment.get("/byThread/:ThreadId", (req, res) => {
    const { ThreadId } = req.params; // Change from req.query to req.params
    console.log(ThreadId); // Make sure you're logging the correct variable

    const query = `SELECT * FROM Comment WHERE ThreadID = ?`;

    db.query(query, [ThreadId], (err, results) => {
        if (err) {
            console.error("Error querying database: ", err);
            res.status(500).json({ success: false, error: "Internal server error" });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

module.exports = comment;