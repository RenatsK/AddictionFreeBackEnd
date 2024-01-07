const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/dbConn.js');
const getUserByEmail = require('./api/userByEmail.js');

const app = express();
const port = 8111;

app.use(cors());
app.use(bodyParser.json());

//Post to the database from the front-end
const register_routes = require('./routes/register.js');
app.use('/register', register_routes);

const login_routes = require('./routes/login.js');
app.use('/login', login_routes);

const user_routes = require('./routes/user.js');
app.use('/user', user_routes);

const threads_routes = require('./routes/threads.js');
app.use('/threads', threads_routes);

const comments_routes = require('./routes/comments.js');
app.use('/comments', comments_routes);

const library_routes = require('./routes/library.js');
app.use('/library', library_routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
