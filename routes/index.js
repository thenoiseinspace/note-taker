//basing the structure for this on the miniproject, including the same naming convention/structure

const express = require('express').Router();
const notesRouter = require('./notes'); 
const path = require('path');

// const app = express();

// app.use('/notes', notesRouter);

express.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

express.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = express;
