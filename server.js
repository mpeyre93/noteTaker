//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//variable to initialize app with express
const app = express();
//look at port environment variable firt, if not available, run on port 5000
const PORT = process.env.PORT || 5000; 

//set up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set public folder as static
app.use(express.static(path.join(__dirname, "./public")));

const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let allNotes;

//routes
app.get("/", (req, res) => {
    res.send(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.send(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
    .then(function (data) {
        return res.json(JSON.parse(data));
    });
});

//write note
app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
    .then(function (data){
        allNotes = JSON.parse(data);
        if (newNote.id || newNote.id === 0) {
            //give note an id
            let currentNote = allNotes[newNote.id];
            currentNote.title = newNote.title;
            currentNote.text = newNote.text;
        } else {
            allNotes.push(newNote);
        }
        writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
            //tell user note was created
            .then(function() {
                console.log("note wrote to db");
            })
    });
    res.json(newNote);
});

//delete note using id
app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
    .then(function (data) {
        allNotes = JSON.parse(data);
        //removes deletetd note
        allNotes.splice(id, 1);
        writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
        //tell user note was deleted 
        .then(function () {
            console.log("note deleted from db");
        })
    });
    res.json(id);
});


//starts server to begin listening, show user message
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
