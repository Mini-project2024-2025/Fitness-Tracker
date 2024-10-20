import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
// import axios from 'axios';
import './Login.css'; // Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulating a simple login check
      if (email === "test@example.com" && password === "password") {
        alert('Login Successful');
        // Redirect to home or dashboard if needed
      } else {
        alert('Invalid email or password');
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