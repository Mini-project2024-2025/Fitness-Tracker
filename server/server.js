// Main server file (Express setup)
const express = require('express');
const mongoose = require('mongoose');
const fitnessRoutes = require('./routes/fitnessRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());  // Middleware to parse JSON

// MongoDB Connection
mongoose.connect('your_mongo_uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/fitness', fitnessRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Set up Express and MongoDB connection.
// Include API routes for fitness tracking, chatbot, and admin features.