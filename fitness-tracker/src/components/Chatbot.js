import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true); // Default to open

  const chatbotRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, gender, age, height, weight, question }),
      });

      const data = await res.json();
      setResponse(formatResponse(data.response));
      setShowInput(false); // Hide input section after submitting
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your request.');
    }
  };

  const formatResponse = (response) => {
    return `<h2>AI Response:</h2><p>${response}</p>`;
  };

  const handleNextQuestion = () => {
    setShowInput(true);
    setQuestion('');
    setResponse('');
  };

  const handlePositiveChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[+]?\d+(\.\d+)?$/.test(value)) {
      setter(value);
    }
  };

  // Close chatbot if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsChatbotOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <div>
      {/* Chatbot container */}
      <div
        className={`chatbot-container ${isChatbotOpen ? 'active' : ''}`}
        ref={chatbotRef}
      >
        <div className="chat-input">
          {showInput ? (
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
                onChange={handlePositiveChange(setAge)}
                placeholder="Enter your age"
                required
              />
              <input
                type="number"
                value={height}
                onChange={handlePositiveChange(setHeight)}
                placeholder="Enter your height in cm"
                required
              />
              <input
                type="number"
                value={weight}
                onChange={handlePositiveChange(setWeight)}
                placeholder="Enter your weight in kg"
                required
              />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything"
                required
              />
              <div className="button-container">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseChatbot}>Close</button>
              </div>
            </form>
          ) : (
            <div className="chat-response">
              <div dangerouslySetInnerHTML={{ __html: response }}></div>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      </div>

      {/* Button to open chatbot when closed */}
      {!isChatbotOpen && (
        <div className="chatbot-toggle-btn" onClick={() => setIsChatbotOpen(true)}>
          <span>💬</span>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
