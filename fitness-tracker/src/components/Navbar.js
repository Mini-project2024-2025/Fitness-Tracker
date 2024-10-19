// Navigation Bar Component
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header>
      <a href="#home" className="logo">Fit<span>Pulse</span></a>
      <ul className="navbar">
        <li><a href="#home">Home</a></li>
        <li><a href="#Dashboard">Dashboard</a></li>
        <li><a href="#Diet Planner">Diet Planner</a></li>
        <li><a href="#Exercise">Exercise</a></li>
        <li><a href="#Help by AI">Help by AI</a></li>
        <li><a href="#AboutUs">About Us</a></li>
      </ul>
      <div className="top-btn">
        <a href='#' className="nav-btn">Join Us</a>
      </div>
    </header>
  );
}

export default Navbar;