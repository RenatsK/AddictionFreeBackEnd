const express = require('express');
const threads = express.Router();
const db = require('../db/dbConn');

threads.get("/allThreads", (req, res) => {
    const query = `SELECT * FROM Thread ORDER BY TimeCreated DESC`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

  threads.post("/addThread", (req, res) => {
    const { Email, Topic, TopicText } = req.body;
  
    const query = `INSERT INTO Thread (UserID, Topic, TopicText) SELECT UserID, ?, ? FROM User WHERE Email = ?`;
  
    db.query(query, [Topic, TopicText, Email], (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, data: results });
      }
    });
  });

module.exports = threads;