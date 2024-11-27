const express = require('express');
const mongoose = require ('mongoose')
const router = express.Router();
router.use(express.json());

router.get('/all', async(request, response) => {
    await mongoose.connect('mongodb://127.0.0.1/my_database');
    const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});
});

router.post('/new', (request, response) => {

});