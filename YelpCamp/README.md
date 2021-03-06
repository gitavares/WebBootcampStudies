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

+ Locus for debuguing package for node. Example: eval(require('locus')) in the line that you want debugguing. It will freeze the code where we put this line code
> npm install locus
// in the terminal, we can write: req.body, req.query, for example to see any results.
// ʆ: req.body
req.body
{}

// ʆ: req.query
req.query
{ search: 'galaxy' }

// ʆ: req.query.search
req.query.search
'galaxy'

+ images upload // https://cloudinary.com
> npm install --save multer cloudinary

+ dotenv to .env files // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
> npm install --save dotenv


////// For deploy
// Heroku.com
// to install:
> brew install heroku/brew/heroku

// login
> heroku login
 
// Create an app on Heroku, which prepares Heroku to receive your source code.
> heroku create

// on package.json must be included the start point on "scripts"
"start": "node app.js"

// to see the heroku git repository
> git remote -v 
> git push heroku master

// to see logs on heroku
> heroku logs

// mongoDB online free
// www.mlab.com
