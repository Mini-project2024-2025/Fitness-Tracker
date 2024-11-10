// Load environment variables from the .env file
require('dotenv').config(); // This line loads values from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

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
