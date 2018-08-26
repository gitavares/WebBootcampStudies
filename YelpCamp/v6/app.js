var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds')

mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'))
seedDB(); // everytime, this clean the DB and put new campgrounds. just for comments tests

// passport configuration
app.use(require('express-session')({
    secret: "Mia meow",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// faz com que o currentUser esteja em todas as rotas, não necessitando passar isso como parâmetro para outras
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", { campground: foundCampground })
        }
    })
})

// CREATE ROUTE (Comments)
app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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

// Auth ROUTES
// show the register form
app.get("/register", function (req, res) {
    res.render("register")
})

//handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("login")
})
// handling login logic
app.post("/login", passport.authenticate("local", 
    { // the middleware
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
        
    }
)

//logic logout
app.get("/logout", function (req, res) {
    req.logout()
    res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, "localhost", function (req, res) {
    console.log("server started")
})