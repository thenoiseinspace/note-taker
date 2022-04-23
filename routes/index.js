//basing the structure for this on the miniproject, including the same naming convention/structure

const express = require('express');
const notesRouter = require('./notes'); 


const app = express();

app.use('/notes', notesRouter);

module.exports = app;
