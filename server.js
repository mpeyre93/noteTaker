//dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

//variable to initialize app with express
var app = express();
//look at port environment variable firt, if not available, run on port 5000
var PORT = process.env.PORT || 5000; 

//set up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//routes
app.get("/", function(req, res){
res.send(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res){
res.send(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes/:id", function(req, res){

});


//starts server to begin listening
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});