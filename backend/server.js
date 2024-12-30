require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());

// CORS Setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Change to your production frontend URL
    methods: ['GET', 'POST'],
    credentials: true,  // This allows cookies to be sent
  })
);

// Connect to MongoDB using the connection string from the .env file
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Routes
const authRoutes = require('./routes/auth');  // Assuming auth.js is your authentication routes
app.use('/api/auth', authRoutes);

// Dashboard routes for authenticated users
app.get('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to calculate calories burned by day
const calculateCaloriesByDay = (workouts) => {
  const groupedData = workouts.reduce((acc, workout) => {
    const day = new Date(workout.date).toISOString().split('T')[0]; // Format: YYYY-MM-DD
    acc[day] = (acc[day] || 0) + workout.calories * workout.duration;
    return acc;
  }, {});

  return Object.entries(groupedData).map(([date, calories]) => ({ date, calories }));
};

// New endpoint to fetch calories burned by day for the line graph
app.get('/api/dashboard/calories-by-day', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('workouts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const caloriesByDay = calculateCaloriesByDay(user.workouts);
    res.json(caloriesByDay);
  } catch (err) {
    console.error('Error fetching calories by day:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to calculate dashboard stats for the current day
const calculateDashboardStats = (workouts) => {
  const today = new Date().setHours(0, 0, 0, 0); // Start of today at midnight

  const totalCalories = workouts
    .filter((workout) => new Date(workout.date).setHours(0, 0, 0, 0) === today)
    .reduce((sum, workout) => sum + workout.calories * workout.duration, 0);

  const totalWorkouts = workouts.filter(
    (workout) => new Date(workout.date).setHours(0, 0, 0, 0) === today
  ).length;

  const avgCaloriesPerWorkout = totalWorkouts === 0 ? 0 : totalCalories / totalWorkouts;

  return { totalCalories, totalWorkouts, avgCaloriesPerWorkout };
};

// Endpoint to fetch dashboard statistics
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('workouts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stats = calculateDashboardStats(user.workouts);
    res.json(stats);
  } catch (err) {
    console.error('Error in calculating dashboard stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to add workout data
app.post('/api/add-workout', authMiddleware, async (req, res) => {
  const { exerciseName, sets, reps, date, intensity, duration, calories } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add workout data to the user's record
    user.workouts.push({ exerciseName, sets, reps, date, intensity, duration, calories });
    await user.save();

    res.status(200).json({
      message: 'Workout added successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server using the port from the .env file or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handling uncaught errors
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection at: ${promise}`, err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
