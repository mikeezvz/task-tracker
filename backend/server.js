const express = require('express');
const cors = require ('cors')
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const session = require('express-session');
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://mike_zvz:mn0tavRJAiW1bsEr@tasks.vnvee.mongodb.net/task-tracker', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connection to MongoDB successful');
    } catch (error) {
      console.error('Verbindung zu MongoDB fehlgeschlagen:', error);
      process.exit(1);
    }
  };

  connectDB();

const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});