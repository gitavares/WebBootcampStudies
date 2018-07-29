var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    seedDB      = require("./seeds")

seedDB(); // everytime, this clean the DB and put new campgrounds. just for comments tests
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


// Campground.create(
//     { 
//         name: "Mountains Goat's Rest", 
//         image: "https://farm3.staticflickr.com/2238/1514148183_092606ba94.jpg",
//         description: "asdasjd aslkdjasl aslkjdlask lkasjdlkas lkjaldkjas"
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("newly create campground")
//             console.log(campground)
//         }
//     }
// )

// var campgrounds = [
//     { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
//     { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
//     { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
//     { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
//     { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
//     { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
//     { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
//     { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
//     { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" },
//     { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3006/3577040280_8a4a97ab10.jpg" },
//     { name: "Granite Hill", image: "https://farm9.staticflickr.com/8525/8546357078_fc1929a4d6.jpg" },
//     { name: "Mountains Goat's Rest", image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg" }
// ]

app.get("/", function (req, res) {
    // res.send("this will be the landing page soon")
    res.render("landing")
})

// INDEX ROUTE -- display all campgrounds
app.get("/campgrounds", function (req, res) {
    // get all campgrounds from DB (mongoDB)
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err)
        } else {
            res.render("index", { campgrounds: allCampgrounds })
        }
    })
    // res.render("campgrounds", { campgrounds: campgrounds })
})

// CREATE -- add a new campground
app.post("/campgrounds", function (req, res) {
    //get dat from form
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = { name: name, image: image, description: description}
    // campgrounds.push(newCampground)
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds") 
        }
    })
    //redirect back to campgrounds page
    // res.redirect("/campgrounds")
})

// NEW ROUTE -- display form to make a new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new")
})

// SHOW ROUTE -- info about one specific campground
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("show", {campground: foundCampground})
        }
    })
    // res.render("show")
})



app.listen(3000, "localhost", function (req, res) {
    console.log("server started")
})