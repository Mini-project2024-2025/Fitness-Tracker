import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import DietPlanner from './components/DietPlanner';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard'; 
import Exercise from './components/Exercise'; // Import Dashboard Component

import './App.css';
import './styles/Navbar.css';
import './styles/HomePage.css';
import './styles/Chatbot.css';
import './styles/Login.css';
import './styles/Register.css';
import './styles/DietPlanner.css';
import './styles/Dashboard.css';  // Add a new CSS file for dashboard styling

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/dietPlanner" element={< DietPlanner/>} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/exercise" element={<Exercise />} /> {/* Add Dashboard Route */}
      </Routes>
    </Router>
  );
}

export default App;
