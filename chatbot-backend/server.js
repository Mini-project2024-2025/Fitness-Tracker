// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch'; // Use import
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle chatbot requests
app.post('/api/chatbot', async (req, res) => {
    const { name, gender, age, height, weight, question } = req.body;

    try {
        // Call AI Model API (replace URL with the actual endpoint for Gemini or your AI service)
        const apiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=GEMINI_API_KEY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, // API Key from .env
            },
            body: JSON.stringify({
                prompt: `User info: Name - ${name}, Gender - ${gender}, Age - ${age}, Height - ${height} cm, Weight - ${weight} kg. Question: ${question}`,
                max_tokens: 100, // Adjust token limit based on response length
            }),
        });

        const data = await apiResponse.json();

        // Check if there's an error in the API response
        if (data.error) {
            res.status(500).json({ response: "AI model couldn't process your request." });
        } else {
            res.status(200).json({ response: data.answer || "No response generated." });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'There was an error processing your request.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Chatbot backend server running on http://localhost:${PORT}`);
});
