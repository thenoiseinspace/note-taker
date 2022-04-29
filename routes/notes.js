//basing this on the miniproject

const notes = require('express').Router();
const dbNotes = require('../db/db.json');
//creates unique id
const { v4: uuidv4 } = require('uuid');
const fs = require("fs"); 

notes.get ('/notes', (req, res) =>{
  var store = require('../db/db.json');
  res.json(store);
});

notes.post ('/notes', (req, res) => {
  var store = require('../db/db.json');
  store.push(req.body);
  fs.writeFile ('./db/db.json', JSON.stringify(store), err => {
      if (err) throw err;
  });
  res.json(store);
});

module.exports = notes;
