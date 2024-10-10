// NEW: Chatbot UI
import React, { useState } from 'react';
import chatbotService from '../services/chatbotService';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    chatbotService.askBot(query)
      .then(res => setResponse(res.message))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Ask the chatbot: </label>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Ask</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
}

export default Chatbot;
// Create an input for user queries and a submit button.
// Use chatbotService to send the query to the backend.