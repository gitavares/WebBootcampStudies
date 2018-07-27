var express = require('express')
var app = express()

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!")
})

app.get("/speak/:animal", function (req, res) {
    var sounds = {
        pig: "oink",
        cow: "moo",
        dog: "woof woof",
        cat: "meow",
        goldfish: "ooo"
    }
    var animal = req.params.animal.toLowerCase()
    
    res.send("The " + animal + " says '" + sounds[animal] + "'")
})

app.get("/repeat/:word/:times", function (req, res) {
    var times = parseInt(req.params.times)
    var word = req.params.word
    var wordManyTimes = ""

    for(var i = 0; i < times; i++){
        wordManyTimes += word + " " 
    }
    res.send(wordManyTimes)
})

app.get("*", function (req, res) {
    res.send("Sorry, page not found...")
})

app.listen(3000, "localhost", function(){
    console.log('server exercise running')
})