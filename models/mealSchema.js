const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  restaurantName: {type: String, required: true},
  location: {type: String, required: true},
  rating: {type: Number, min: 0, max:5, required: true},
  name: {type: String, required: true},
  appetizer: {type: [String]},
  entree: {type: [String]},
  dessert: {type: [String]},
  alcoholicDrink: {type: [String]},
  nonAlcoholicDrink: {type: [String]}
})

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
