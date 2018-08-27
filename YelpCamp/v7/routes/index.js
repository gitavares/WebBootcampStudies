var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")

// the root route
router.get("/", function (req, res) {
    // res.send("this will be the landing page soon")
    res.render("landing")
})

// Auth ROUTES
// show the register form
router.get("/register", function (req, res) {
    res.render("register")
})

//handle sign up logic
router.post("/register", function (req, res) {
    // res.send("signed up")
    var newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds")
        })
    })
})

// show login form
router.get("/login", function (req, res) {
    res.render("login")
})
// handling login logic
router.post("/login", passport.authenticate("local", 
    { // the middleware
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
        
    }
)

//logic logout route
router.get("/logout", function (req, res) {
    req.logout()
    res.redirect("/campgrounds")
})

// middleware 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router