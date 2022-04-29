//basing this on the miniproject

const notes = require('express').Router();
// const { readFromFile, readAndAppend } = require('../Develop/db/db.json');
const dbNotes = require('../db/db.json');
//creates unique id
const { v4: uuidv4 } = require('uuid');
const fs = require("fs"); 

// GET Route for retrieving all the tips
// notes.get('/', (req, res) => {
//   readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
// });

notes.get ('/notes', (req, res) =>{
  var store = require('../db/db.json');
  res.json(store);
});

// POST Route for a new note
// notes.post('/', (req, res) => {
//   // console.log(req.body);
//   console.log(dbNotes); 

//   const { title, noteBody } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       noteBody,
//       note_id: uuidv4(),
//     };

//     // readAndAppend(newNote, './Develop/db/db.json');
//     res.json(`Note added successfully 🚀`);
//   } else {
//     res.error('Error in adding note');
//   }
// });


notes.post ('/notes', (req, res) => {
  var store = require('../db/db.json');
  store.push(req.body);
  fs.writeFile ('./db/db.json', JSON.stringify(store), err => {
      if (err) throw err;
  });
  res.json(store);
});

module.exports = notes;
