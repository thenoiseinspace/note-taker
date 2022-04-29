//basing this on the miniproject

const notes = require('express').Router();
// const { readFromFile, readAndAppend } = require('../Develop/db/db.json');
const dbNotes = require('../Develop/db/db.json');
//creates unique id
const { v4: uuidv4 } = require('uuid');
const fs = require("fs"); 

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  // console.log(req.body);
  console.log(dbNotes); 

  const { title, noteBody } = req.body;

  if (req.body) {
    const newNote = {
      title,
      noteBody,
      note_id: uuidv4(),
    };

    // readAndAppend(newNote, './Develop/db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
