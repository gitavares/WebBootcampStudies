var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dcb3iedum', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// INDEX ROUTE -- display all campgrounds
router.get("/", function (req, res) {
    // eval(require('locus'))
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi') //g = global and i = ignore cases
        Campground.find({name: regex}, function (err, allCampgrounds) {
            if(err){
                console.log(err)
            } else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' })
            }
        })
    } else {
        // get all campgrounds from DB (mongoDB)
        Campground.find({}, function (err, allCampgrounds) {
            if(err){
                console.log(err)
            } else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' })
            }
        })
    }
})

// CREATE -- add a new campground
router.post("/", middleware.isLoggedIn, upload.single("image"), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
        req.body.campground.image = result.secure_url
        req.body.campground.author = {
            id: req.user._id,
            username: req.user.username
        }
        Campground.create(req.body.campground, function (err, campground) {
            if(err){
                req.flash("error", err.message)
                return res.redirect("back")
            } 
            res.redirect("/campgrounds/" + campground.id)
        })
    })
    
    // //get data from form
    // var name = req.body.name
    // var price = req.body.price
    // var image = req.body.image
    // var description = req.body.description
    // var author = {
    //     id: req.user._id,
    //     username:req.user.username
    // }
    // var newCampground = { name: name, price: price, image: image, description: description, author: author}
    // // create a new campground and save to DB
    // Campground.create(newCampground, function(err, newlyCreated){
    //     if(err){
    //         console.log(err)
    //     } else {
    //         //redirect back to campgrounds page
    //         res.redirect("/campgrounds") 
    //     }
    // })
})

// NEW ROUTE -- display form to make a new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    })
})

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if(err){
            res.redirect("/campgrounds")
        }
        res.redirect("/campgrounds/" + req.params.id)
    })
})

// DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/campgrounds") // must be treated, course
        }
        res.redirect("/campgrounds")
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = router