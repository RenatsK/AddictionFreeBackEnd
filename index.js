const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/dbConn.js');
const getUserByEmail = require('./api/userByEmail.js');

const app = express();
const port = 8111;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await getUserByEmail(userEmail);

    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: 'Invalid email or login failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Post to the database from the front-end
const register_routes = require('./routes/register.js');
app.use('/register', register_routes);

const login_routes = require('./routes/login.js');
app.use('/login', login_routes);

const user_routes = require('./routes/user.js');
app.use('/user', user_routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
