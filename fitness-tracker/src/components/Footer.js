// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css'; // Make sure to import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Connect with us..</h2>
      <p>Follow us on social media for the latest tips and updates!</p>
      <ul className="social-links">
        <li>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" />
            Facebook
          </a>
        </li>
        <li>
          <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x" />
            X
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in" />
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" />
            Instagram
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;