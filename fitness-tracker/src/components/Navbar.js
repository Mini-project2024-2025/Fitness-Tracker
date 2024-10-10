// Navigation Bar Component
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/log">Log Activity</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
// Use <Link> from React Router to provide navigation to different routes.