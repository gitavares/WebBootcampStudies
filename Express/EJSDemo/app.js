var express = require('express')
var app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")


app.get("/", function (req, res) {
    // res.render("home.ejs")
    res.render("home")
})

app.get("/fallinlovewith/:thing", function (req, res) {
    var thing = req.params.thing
    // res.render("love.ejs", {thingVar: thing})
    res.render("love", {thingVar: thing})
})

app.get("/posts", function (req, res) {
    var posts = [
        { title: "Post 1", author: "Susy" },
        { title: "Post 2", author: "Gi" },
        { title: "Post 3", author: "Peri" }
    ]

    // res.render("posts.ejs", {posts: posts})
    res.render("posts", {posts: posts})
})

app.listen(3000, "localhost", function () {
    console.log("server running")
})