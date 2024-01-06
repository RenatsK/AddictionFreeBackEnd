const express = require('express');
const library = express.Router();
const db = require('../db/dbConn');

library.get("/allLibrary", (req, res) => {
    const query = `SELECT * FROM Library`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

module.exports = library;