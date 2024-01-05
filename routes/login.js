const express = require('express');
const login = express.Router();
const db = require('../db/dbConn');

login.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], function (error, results) {
            if (error) {
                console.error('Error during database query:', error);
                res.status(500).json({ success: false, message: 'Error during login' });
                return;
            }
            if (results.length > 0) {
                const user = results[0];
                res.json({ success: true, user });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
});

module.exports = login;
