var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")

// INDEX ROUTE -- display all campgrounds
router.get("/", function (req, res) {
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
router.post("/", function (req, res) {
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
router.get("/new", function (req, res) {
    res.render("campgrounds/new")
})

// SHOW ROUTE -- info about one specific campground
router.get("/:id", function (req, res) {
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

module.exports = router