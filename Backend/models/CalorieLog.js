const mongoose = require('mongoose');

const calorieLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true
  },
  foodItem: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
});

const CalorieLog = mongoose.model('CalorieLog', calorieLogSchema);

module.exports = CalorieLog;