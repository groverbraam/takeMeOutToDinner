const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  restaurantName: {type: String, required: true},
  location: {type: String, required: true},
  rating: {type: Number, min: 0, max:5, required: true},
  date: {type: String, required: true},
  name: {type: String, required: true},
  appetizer: [String],
  entree: [String],
  dessert: [String],
  alcoholicDrink: [String],
  nonAlcoholicDrink: [String],
},{timestamps: true})

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
