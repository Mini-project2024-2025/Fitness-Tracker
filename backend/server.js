// Load environment variables from the .env file
require('dotenv').config(); // This line loads values from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware');  // Import authentication middleware
const User = require('./models/User');  // User model for accessing data
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Example of restricting to a specific domain
    methods: ['GET', 'POST']
}));

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Routes
const authRoutes = require('./routes/auth');  // Assuming auth.js is your authentication routes
app.use('/api/auth', authRoutes);

// Dashboard routes for authenticated user
app.get('/api/dashboard', authMiddleware, async (req, res) => {
    try {
        // Fetch user data by their ID, excluding password field
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });  // Send the user data to the frontend
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Function to calculate stats for the current day
const calculateDashboardStats = (workouts) => {
    const today = new Date().setHours(0, 0, 0, 0); // Start of today at midnight

// Calculate total calories burned today
const totalCalories = workouts
    .filter(workout => new Date(workout.date).setHours(0, 0, 0, 0) === today)
    .reduce((sum, workout) => sum + (workout.calories * workout.duration), 0);

    // Calculate total number of workouts today
    const totalWorkouts = workouts.filter(workout => new Date(workout.date).setHours(0, 0, 0, 0) === today).length;

    // Calculate average calories burned per workout today
    const avgCaloriesPerWorkout = totalWorkouts === 0 ? 0 : totalCalories / totalWorkouts;

    return { totalCalories, totalWorkouts, avgCaloriesPerWorkout };
};

// New endpoint to fetch dashboard statistics
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).populate('workouts'); // Ensure workouts are populated
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const stats = calculateDashboardStats(user.workouts);

        // Return the statistics to the frontend
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

        // Recalculate and fetch updated stats after adding the workout
        const updatedStats = calculateDashboardStats(user.workouts);

        res.status(200).json({
            message: 'Workout added successfully',
            stats: updatedStats  // Send the updated stats back in the response
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

// Start server using the port from the .env file or default to 5000
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
