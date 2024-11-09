// models/Goal.js

const mongoose = require('mongoose');

// Define the Goal schema
const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  exercise: { type: String, required: true },
  targetTime: { type: Number, required: true }, // Time in minutes
  reminderTime: { type: Number, default: null }, // Optional reminder time
});

// Create the Goal model
const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
