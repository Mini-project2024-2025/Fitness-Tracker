import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import GoogleGenerativeAI
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Function to get response from Google Gemini AI
async function getGeminiResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

// Route to handle chatbot requests
app.post('/api/chatbot', async (req, res) => {
    const { name, gender, age, height, weight, question } = req.body;

    // Construct a clear and structured prompt for the AI
    const prompt = `
        You are an intelligent fitness assistant.
        User Information:
        - Name: ${name}
        - Gender: ${gender}
        - Age: ${age}
        - Height: ${height} cm
        - Weight: ${weight} kg
        User Question: ${question}
        
        Please provide a detailed response, including tips or suggestions related to the user's question.
    `;

    try {
        // Get AI response
        const aiResponse = await getGeminiResponse(prompt);
        
        // Format the AI response for clarity and structure
        const formattedResponse = formatResponse(aiResponse);

        // Send the formatted AI response to the client
        res.status(200).json({ response: formattedResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'There was an error processing your request.' });
    }
});
app.post('/api/dietPlanner', async (req, res) => {
    const { age, gender, height, weight,targetWeight, goal, dietType, mealTime, question } = req.body;

    // Construct a clear and structured prompt for the AI
    const prompt = `
        You are an intelligent fitness assistant.
        User Information:
        - Age: ${age}
        - Gender: ${gender}
        - Height: ${height} cm
        - Weight: ${weight} kg
        - Target Weight: ${targetWeight} kg
        - Goal: ${goal}
        - Diet Type: ${dietType}
        - Meal Time: ${mealTime}
        User question: ${question}
        
        Please provide a detailed response, including tips or suggestions based on user's data.
    `;

    try {
        // Get AI response
        const aiResponse = await getGeminiResponse(prompt);
        
        // Format the AI response for clarity and structure
        const formattedResponse = formatResponse(aiResponse);

        // Send the formatted AI response to the client
        res.status(200).json({ response: formattedResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'There was an error processing your request.' });
    }
});

// Function to format the AI response
function formatResponse(response) {
    // Split the response into lines
    const lines = response.split('\n').filter(line => line.trim() !== '');

    // Initialize an array to hold formatted output
    let formattedOutput = [];
    let inList = false; // Track if we are currently adding to a list

    // Loop through each line to format it
    lines.forEach(line => {
        line = line.trim(); // Clean up whitespace

        // Remove Markdown formatting
        line = line.replace(/^\#\s+/g, ''); // Remove leading hashtags for headings
        line = line.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold asterisks
        line = line.replace(/^\*\s+/g, ''); // Remove leading asterisks for list items

        // Check if the line starts with "Healthy Vegetarian Breakfast Options for"
        if (line.startsWith('Healthy Vegetarian Breakfast Options for')) {
            formattedOutput.push(`<h2>${line}</h2>`); // Treat this line as a heading
        } 
        // Check for tips section or similar headings
        else if (line.startsWith('Tips for a Healthy Breakfast:')) {
            formattedOutput.push(`<h3>${line}</h3>`); // Treat as a subheading
        }
        if(line.startsWith('I am allergic of')){
            formattedOutput.push(`<h2>${line}</h2>`);
        } 
        // Check for bullet points (lines starting with *)
        else if (line.startsWith('•')) {
            if (!inList) {
                formattedOutput.push('<ul>'); // Start a new list
                inList = true; // Update the tracking variable
            }
            // Add list item without the asterisk
            formattedOutput.push(`<li>${line.slice(2).trim()}</li>`);
        } 
        // Check if the line is part of a list but doesn't start with an asterisk
        else if (inList && line === '') {
            // If there's an empty line, close the list
            formattedOutput.push('</ul>');
            inList = false; // Reset the tracking variable
        } 
        // Otherwise treat it as a paragraph
        else {
            formattedOutput.push(`<p>${line}</p>`);
        }
    });

    // Close any open list at the end of processing
    if (inList) {
        formattedOutput.push('</ul>'); // Close the list if still open
    }

    return formattedOutput.join('');
}

// Start server
app.listen(PORT, () => {
    console.log(`Chatbot backend server running on http://localhost:${PORT}`);
});
