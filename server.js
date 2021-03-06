//Setup - based on activity 1

/////////////////
//Configuration//
/////////////////
const express = require("express"); 
const path = require ("path"); 
const fs = require("fs"); 
const api = require("./routes/notes.js"); 
const util = require("util"); 
const dbNotes = require("./db/db.json"); 
//uuid comes from unit 15 
const uuid = require("uuid"); 

const app = express(); 
const PORT = process.env.PORT || 3001;
 
const { allowedNodeEnvironmentFlags } = require("process");

//Setting up for async processes
const writeFileAsync = util.promisify(fs.readFile); 
const readFileAsync = util.promisify(fs.readFile); 

//////////////
//middleware//
//////////////

//bringing in Express
app.use(express.urlencoded({extended: true})); 
//Jung said in the coding slack channel that JSON should be capitalized, but this one keeps reverting to lower case when I type it? Not sure why?
app.use(express.json()); 
//This is the middleware part--static automatically creates urls to everything inside the public folder so we don't have to do it manually
app.use(express.static("public"))
app.use('/api', api); 


//Setting up HTML API routes - basing mostly on the structure from activities 3, 7, and 13 

///////////////
//HTML routes//
///////////////

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
   // console.log(notes[0].title); 
    res.sendFile(path.join(__dirname, "/public/index.html")); 
}); 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html")); 
});

////////////////
//Get requests//
////////////////

//this one reads the db.json file and converts it 
app.get("/api/notes", function(req, res){
    readFileAsync("./db/db.json", "utf8").then(function(data){
        dbNotes.push (JSON.parse(data))
        res.JSON(dbNotes); 
    })
})

/////////////////
//Post requests//
/////////////////

app.post("/api/notes", function(req, res){
    const note = req.body; 
    dbNotes.push(note); 
    readFileAsync("./db/db.JSON", "utf8").then(function(data){
       //adding an empty array here to hold the notes
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length +1
        notes.push(note); 
        return notes
    }).then(function(notes){
        //push the note back to the db.json 
        writeFileAsync("./db/db.JSON", JSON.stringify(data))
        res.JSON(note); 
    })
}); 

///////////////////
//Delete requests//
///////////////////

//Please note - this does not currently work

// app.delete("/api/notes/:id", function(req, res){
//     const idToDelete = parseInt(req.params.id); 
//     readFileAsync("./db/db.JSON", "utf8").then(function(data){
//         const notes = [].concat(JSON.parse(data));
//         const newNotesData = []
//         for (let i = 0; i<notes.length; i++){
//             if(idToDelete !== notes[i].id){
//                 newNotesData.push(notes[i])
//             }
//         }
//         return newNotesData
//     }).then(function(notes){
//         writeFileAsync("./db/db.JSON", JSON.stringify(notes))
//         res.send("note saved successfully"); 
//     })
// }) 


//Listening - and yes I *DID* add the rocket ship like the class activities
app.listen(PORT, function(){
    console.log(`App listening on "http://localhost:${PORT}" ???? `); 
}); 
