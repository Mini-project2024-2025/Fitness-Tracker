// routes/goalsRoutes.js

const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');

// Set a new goal
router.post('/api/goals', goalsController.setGoal);

// Get goals by user ID
router.get('/api/goals/:userId', goalsController.getUserGoals);

module.exports = router;
