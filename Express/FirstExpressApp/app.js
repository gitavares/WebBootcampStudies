var express = require("express")
var app = express()


// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!")
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!")
})

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW!")
})

// some pattern
app.get("/r/:something", function(req, res) {
    var something = req.params.something
    res.send("WELCOME TO " + something.toUpperCase() + " PATTERN LINK!")
})

app.get("/r/:something/comments/:id/:title", function(req, res) {
    res.send("SOME PATTERN LINK with more sublink!")
})

// must be in the final, otherwise, it will overwise the others
app.get("*", function(req, res) {
    res.send("YOU ARE MY START!")
})

// https://ide.c9.io/gitavares/gi-webbootcamp-node version
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server has started!")
// })

app.listen(3000, "localhost", function(){
    console.log("server has started!")
})