const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  });
  
  const Task = mongoose.model('tasks', taskSchema);

router.get('/all', async (request, response) => {
    try {
        const tasks = await Task.find();    
        response.json(tasks);
        console.log('Data received')
    } catch (error) {
        response.status(500).send('Tasks can not be loaded from DB')
        console.error('Data can not be received:', error)
    }

});

router.post('/new', async (request, response) => {
    try{
    const doc = new Task({
        title: request.body.title,
        description: request.body.description,
        completed: request.body.completed
      });
    const savedTask = await doc.save();
    response.status(201).json(savedTask)
    console.log('Document saved')
    }
    catch (error) {
        response.status(500).send('Document can not be saved')
        console.error('Error saving task:', error)
    }

});

module.exports = router;