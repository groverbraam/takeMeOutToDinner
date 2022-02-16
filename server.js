//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const session = require('express-session')
const Meal = require('./models/mealSchema.js');
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
///updating list
app.put("/mylist/:id", (req, res) => {
  Meal.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedMeal) => {
    if (error) {
      console.log("error");
    } else {
      res.redirect("/mylist")
    }
  })
})
//home homepage
app.get('/', (req, res) => {
  res.render('index.ejs')
})
//my list page and google maps
app.get('/home', (req, res) => {
  res.render('home.ejs')
})
//post to list
app.post("/mylist", (req, res) => {
  ////Trying to remove timezone
  // let date = req.body.date;
  // date.toTimeString();
  Meal.create(req.body, (error, createdMeal) => {
    res.redirect("/mylist");
  })
})
//list page
app.get("/mylist", (req, res) => {
  Meal.find({}, (err, allMeals) => {
  res.render('myList.ejs',
  {
    meals: allMeals
  }
)
})
})
//add to the list
app.get("/mylist/add", (req, res) => {
  res.render("add.ejs")
})
//show page for restaurant
app.get("/mylist/:id", (req, res) => {
  Meal.findById(req.params.id, (err, selectedMeal) => {
  res.render("show.ejs",
  {
    meals: selectedMeal
  }
)
})
})

//edit list
app.get("/mylist/:id/edit", (req, res) => {
  Meal.findById(req.params.id, (error, updatedMeal) => {
    res.render("edit.ejs", {
      meals: updatedMeal
    })
  })
})
///delete from the list
app.delete("/mylist/:id", (req, res) => {
  Meal.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/mylist")
  })
})
// app.put('/mylist', (req, res) => {
//   Meal.find(req.params.restaurantName, (err, allMeals) => {
//   res.render('myList.ejs',
//   {
//     meals: allMeals
//   }
// )
// })
// })
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
