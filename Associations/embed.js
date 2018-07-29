var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true })

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})

var Post = mongoose.model("Post", postSchema)

// USER - email , name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

var User = mongoose.model("User", userSchema)



// var newUser = new User({
//     email: "gise@gmail.com",
//     name: "Charlie Brown"
// })
// newUser.save(function (err, user) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

// var newPost = new Post({
//     title: "test Post",
//     content: "skjadsakjd alsdkjalskd laksjdlkas laskjdklas"
// })
// newPost.save(function (err, post) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

// var newUser = new User({
//     email: "peri@peri.com",
//     name: "Peri"
// })
// newUser.posts.push({
//     title: "How to do it with your hands",
//     content: "'How to do it with your hands' it's a book that describe lksjdlkasjdlkas askldjalskd aslkdjaslk"
// })
// newUser.save(function (err, user) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })


User.findOne({name: 'Peri'}, function (err, user) {
    if(err){
        console.log(err)
    } else {
        // console.log(user)
        user.posts.push({
            title: "This is one more test",
            content: "yeah... it's not a big deal :)"
        })
        user.save(function (err, user) {
            if(err){
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})