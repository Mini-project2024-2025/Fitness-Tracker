// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert('Login Successful');
      // Save token if needed
      localStorage.setItem('token', data.token);
    } else {
      alert(data.message || 'Login Failed');
    }
  };
  

  return (
    <div className='login-background'>
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome!!</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit">Login</button>
          </form>
          <div className="register-link">
            <p>Do not have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
