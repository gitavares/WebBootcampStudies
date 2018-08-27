var express = require("express")
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")


// NEW ROUTE (Comments)
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", { campground: foundCampground })
        }
    })
})

// CREATE ROUTE (Comments)
router.post("/", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err)
                } else {
                    // add username and id to comment
                    comment.author.username = req.user.username
                    comment.author.id = req.user._id
                    // save comment
                    comment.save()
                    
                    foundCampground.comments.push(comment)
                    foundCampground.save()
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            })
        }
    })
})

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router