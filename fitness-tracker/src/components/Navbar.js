// Navigation Bar Component
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () =>{
  return(
    <header>
      <a href="#home" className="logo">Fit<span>Zura</span></a>
      <ul className="navbar">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#plans">Pricing</a></li>
        <li><a href="#review">Review</a></li>
      </ul>
      <div className="top-btn">
        <a href='#' className="nav-btn">Join Us</a>
      </div>
    </header>
  );
}

export default Navbar;