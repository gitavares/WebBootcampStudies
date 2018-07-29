var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    seedDB      = require('./seeds')

seedDB(); // everytime, this clean the DB and put new campgrounds. just for comments tests
mongoose.connect('mongodb://localhost:27017/yelp_camp_v4', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

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
            res.render("campgrounds/index", { campgrounds: allCampgrounds })
        }
    })
})

// CREATE -- add a new campground
app.post("/campgrounds", function (req, res) {
    //get dat from form
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = { name: name, image: image, description: description}
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds") 
        }
    })
})

// NEW ROUTE -- display form to make a new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new")
})

// SHOW ROUTE -- info about one specific campground
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

// COMMENTS ROUTES
// ==============
// NEW ROUTE (Comments)
app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", { campground: foundCampground })
        }
    })
})

// CREATE ROUTE (Comments)
app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err)
                } else {
                    foundCampground.comments.push(comment)
                    foundCampground.save()
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            })
        }
    })
})

app.listen(3000, "localhost", function (req, res) {
    console.log("server started")
})