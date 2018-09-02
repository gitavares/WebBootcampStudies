> npm int
> npm install --save express ejs request body-parser

+ MongoDB (Documents/mongodb/bin)

> npm install mongoose --save


// Mongo basic sintaxe
// to start the server - inside the bin folder on MongoDB
> mongod

// to run (in another terminal) 
> mongo

// to show all dbs
> show dbs 

// to use a db
> use <dbname>

// to see the collections
> show collections

// to see the data in a collection
> db.<collectionsname>.find()

// to drop a collection
> db.<collectionname>.drop()


// RESTful Routes (a pattern to define a route)
name        url             HTTP verb       description
====================================================================================
INDEX       /dogs           GET             Display a list of all dogs
NEW         /dogs/new       GET             Form to make a new dog
CREATE      /dogs           POST            Add new dog to DB
SHOW        /dogs/:id       GET             Show info about one dog
EDIT        /dogs/:id/edit  GET             Show edit form for one dog
UPDATE      /dogs/:id       PUT             Update a particular dog, then rediret somewhere
DESTROY     /dogs/:id       DELETE          Delete a particular dog, then redirect somewhere


INDEX       /campgrounds            GET
NEW         /campgrounds/new        GET
CREATE      /campgrounds            POST
SHOW        /campgrounds/:id        GET


NEW         /campgrounds/:id/comments/new       GET
CREATE      /campgrounds/:id/comments           POST

+ Passport
> npm install passport passport-local passport-local-mongoose express-session --save

+ Method override
> npm install --save method-override

+ Connect Flash // The flash is a special area of the session used for storing messages
> npm install --save connect-flash

+ nodemon // to update the server automatically
> npm install -g nodemon
> nodemon   // if app.js is the main file on package.json or nodemon app.js

+ moment // to put the time that something was posted
> npm install --save moment