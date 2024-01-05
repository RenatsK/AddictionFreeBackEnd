const express = require('express');
const comment = express.Router();
const db = require('../db/dbConn');

comment.get("/allComments", (req, res) => {
    const query = `SELECT * FROM Comment ORDER BY TimeCreated`;
  
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
    const { ThreadId } = req.params;
    const query = `
    SELECT Comment.*, User.UserID, User.Name, User.Surname
    FROM Comment
    INNER JOIN User ON Comment.UserId = User.UserId
    WHERE Comment.ThreadID = ?
    `;
    db.query(query, [ThreadId], (err, results) => {
        if (err) {
            console.error("Error querying database: ", err);
            res.status(500).json({ success: false, error: "Internal server error" });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

comment.post('/addComment', (req, res) => {
  const { Email, Text, ThreadID } = req.body;

  const sql = 'INSERT INTO Comment (UserID, Text, ThreadID) SELECT UserID, ?, ? FROM User WHERE Email = ?';
  db.query(sql, [Text, ThreadID, Email], (err, result) => {
    if (err) {
      console.error('Error inserting comment:', err);
      res.status(500).json({ message: 'Error inserting comment', error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = comment;