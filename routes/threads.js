const express = require('express');
const threads = express.Router();
const db = require('../db/dbConn');

threads.get("/allThreads", (req, res) => {
    const query = `SELECT * FROM Thread`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

module.exports = threads;