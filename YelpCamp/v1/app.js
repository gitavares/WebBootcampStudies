var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

var campgrounds = [
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
    { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
    { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
    { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
    { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
    { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
    { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
    { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
    { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" }
]

app.get("/", function (req, res) {
    // res.send("this will be the landing page soon")
    res.render("landing")
})

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds })
})

app.post("/campgrounds", function (req, res) {
    //get dat from form
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name: name, image: image}
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new")
})



app.listen(3000, "localhost", function (req, res) {
    console.log("server started")
})