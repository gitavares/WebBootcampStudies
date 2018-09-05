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