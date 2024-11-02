import React, { useState } from 'react';
import './Chatbot.css'; 

const Chatbot = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Updated fetch URL to the new chatbot backend
      const res = await fetch('http://localhost:5001/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, gender, age, height, weight, question }),
      });

      const data = await res.json();
      setResponse(data.response);
      setQuestion('');  // Clear the question input after submitting
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your request.');
    }
  };

  return (
    <div className="chatbot-container">
      {/* Input section */}
      <div className="chat-input">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" 
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age" 
            required
          />
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height in cm" 
            required
          />
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight in kg" 
            required
          />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Response section */}
      <div className="chat-response">
        <div id="responseBox">
          {response}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
