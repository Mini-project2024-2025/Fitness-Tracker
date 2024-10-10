// New: Controller for fitness data
const Fitness = require('../models/userModel');

const logActivity = async (req, res) => {
  const { steps, calories } = req.body;
  const newActivity = { steps, calories, date: new Date() };

  try {
    const result = await Fitness.updateOne({ userId: req.user.id }, { $push: { activities: newActivity } });
    res.json({ message: 'Activity logged!' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging activity' });
  }
};

module.exports = { logActivity };

// This file handles fitness data logging and retrieval.

