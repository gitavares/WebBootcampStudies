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

--------------------------------------------

> npm init
> npm install express mongoose body-parser ejs --save
> npm install method-override --save
> npm install express-sanitizer --save