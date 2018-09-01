var Campground = require("../models/campground")
var Comment = require("../models/comment")

// all the middleware goes here
var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err){
                res.redirect("back")
            }

            if(foundCampground.author.id.equals(req.user._id)){
                return next()
            } else {
                res.redirect("back")
            }
        })
    } else {
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if(err){
                res.redirect("back")
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}


module.exports = middlewareObj