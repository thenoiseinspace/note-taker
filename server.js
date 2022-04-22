//Note: I had to run npm i express twice to get this to work? Not sure why. Anyway, now all my package-lock.json and module files are duplicated, have fun with that. 

//Setup - based on activity 1
const express = require("express"); 
const path = require ("path"); 

const app = express(); 
const PORT = process.env.PORT || 3001;

const fs = require ("fs"); 
const util = require("util"); 
const { allowedNodeEnvironmentFlags } = require("process");

//Setting up HTML routes - also in activity 1
app.get("/notes", function(req, res){
    res.sendFile(path.join(_dirname, ".develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(_dirname, "./develop/public/index.html")); 
}); 

app.get("*", function(req, res){
    res.sendFile(path.join(_dirname, "./develop/public/index.html")); 
});

//Listening - and yes I *DID* add the rocket ship like the class activities
app.listen(PORT, function(){
    console.log("App listening on http://localhost:${PORT} 🚀 "); 
}); 



