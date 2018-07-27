var express = require('express')
var app = express()
var request = require('request')
app.set("view engine", "ejs")

app.get("/", function (req, res) {
    res.render("search")
})

app.get("/results", function(req, res){
    // res.send("helloooo")
    var query = req.query.search
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body)
            // res.send(parsedData)
            // res.send(parsedData["Search"][0])
            // res.send(parsedData["Search"][0]["Title"])
            res.render("results", { parsedData: parsedData })
        }
    })
})

app.listen(3000, "localhost", function (req, res) {
    console.log("server started")
})

