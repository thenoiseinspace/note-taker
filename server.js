//Note: I had to run npm i express twice to get this to work? Not sure why. Anyway, now all my package-lock.json and module files are duplicated, have fun with that. 

//Setup - based on activity 1

/////////////////
//Configuration//
/////////////////
const express = require("express"); 
const path = require ("path"); 

const api = require("./routes/index.js"); 

const app = express(); 
const PORT = process.env.PORT || 3001;

const fs = require ("fs"); 
const util = require("util"); 
const { allowedNodeEnvironmentFlags } = require("process");

const writeFileAsync = util.promisify(fs.readFile); 
const readFileAsync = util.promisify(fs.readFile); 

//getting an error for dirname, found this solution on a github help page--hey, it worked! 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//////////////
//middleware//
//////////////

//bringing in Express
app.use(express.urlencoded({extended: true})); 
//Jung said in the coding slack channel that JSON should be capitalized, but this one keeps reverting to lower case when I type it? Not sure why?
app.use(express.json()); 
//This is the middleware part--static automatically creates urls to everything inside the public folder so we don't have to do it manually
app.use(express.static(".Develop/public"))
// app.use('/api', api); 

///////////////
//HTML routes//
///////////////

//Setting up HTML routes - basing mostly on the structure from activities 3 and 7
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html")); 
}); 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html")); 
});

//Listening - and yes I *DID* add the rocket ship like the class activities
app.listen(PORT, function(){
    console.log("App listening on http://localhost:${PORT} 🚀 "); 
}); 


app.get("/api/notes", function(req, res){
    readFileAsync("./develop/db/db.json", "utf8").then(function(data){
        notes = [].concat(JSON.parse(data))
        res.JSON(notes); 
    })
})

app.post("/api/notes", function(req, res){
    const note = req.body; 
    readFileAsync(".develop/db/db.JSON", "utf8").then(function(data){
        note.id = notes.length +1
        notes.push(note); 
        return notes
    }).then(function(notes){
        writeFileAsync("./develop/db/db.JSON", JSON.stringify(notes))
        res.JSON(note); 
    })
}); 

app.delete("/api/notes/:id", function(req, res){
    const idToDelete = parseInt(req.params.id); 
    readFileAsync("./develop/db/db.JSON", "utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i<notes.length; i++){
            if(idToDelete !== notes[i].id){
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes){
        writeFileAsync("./develop/db/db.JSON", JSON.stringify(notes))
        res.send("saved successfully"); 
    })
}) 

