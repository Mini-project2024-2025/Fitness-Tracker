// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';

import './App.css';
import './styles/Navbar.css';
import './styles/HomePage.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
