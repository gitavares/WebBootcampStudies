var mongoose = require('mongoose')
// mongoose.connect("mongodb://localhost/cat_app")
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
})  // just a pattern for a data... it's not mandatory

var Cat = mongoose.model("Cat", catSchema)

// adding new cat to the DB
// var data = new Cat ({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// })

// data.save(function(err, cat) {
//     if(err){
//         console.log("something went wrong")
//     } else {
//         console.log("we just save the cat to the db")
//         console.log(cat)
//     }
// })

Cat.create({
    name: "Jose",
    age: 12,
    temperament: "Fluffy"
}, function (err, cat) {
    if(err){
        console.log("erroooo")
    } else {
        console.log(cat)
    }
})

Cat.find({}, function (err, cats) {
    if(err){
        console.log("oh no!")
        console.log(err)
    } else {
        console.log("all the cats")
        console.log(cats)
    }
})

//retrive all cats from the DB and console.log each one