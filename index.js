const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/dbConn.js'); // Adjust the path

const app = express();
const port = 28111;

app.use(cors());
app.use(bodyParser.json());



const register_routes = require('./routes/register.js')
app.use('/register', register_routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});