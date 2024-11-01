import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header>
      <Link to="/" className="logo">Fit<span>Zura</span></Link>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><a href="#features">Key Features</a></li>
        <li><a href="#Dashboard">Dashboard</a></li>
        <li><a href="#Diet Planner">Diet Planner</a></li>
        <li><a href="#Exercise">Exercise</a></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><a href="#about-us">About Us</a></li>
      </ul>
      <div className="top-btn">
        <Link to="/login" className="nav-btn">Join Us</Link>
      </div>
    </header>
  );
};

export default Navbar;
