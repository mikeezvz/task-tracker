const express = require('express');
const cors = require ('cors')
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const session = require('express-session');
const router = express.Router();
require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const mongoURL = process.env.MONGO_URL

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connection to MongoDB successful');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  };

  connectDB();

const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});