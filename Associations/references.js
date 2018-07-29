var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true })

var Post = require("./models/post")
var User = require("./models/user")





Post.create({
    title: "how to cook the best burguer - Part 5",
    content: "Mmmmm... now we are are using Exports... ok :D"
}, function(err, post){
    if(err){
        console.log(err)
    } else {
        User.findOne({email: "Mia@mia.com"}, function(err, foundUser){
            if(err){
                console.log(err)
            } else {
                foundUser.posts.push(post)
                foundUser.save(function (err, data) {
                    if(err){
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                })
            }
        })
    }
})

// User.create({
//     email: "Mia@mia.com",
//     name: "Mia"
// })

// FIND user
// FIND all posts for that user
// User.findOne({email: "Mia@mia.com"}).populate("posts").exec(function (err, user) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })
