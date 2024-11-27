const express = require('express');
const cors = require ('cors')
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.json());


app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});