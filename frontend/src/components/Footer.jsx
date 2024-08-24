import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand-section">
          <h4>Bonsai Haven</h4>
          <p>Your sanctuary for timeless bonsai beauty.</p>
        </div>
        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p>
            Email:{' '}
            <a href="mailto:info@bonsaihaven.com">info@bonsaihaven.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">(123) 456-7890</a>
          </p>
          <p>123 Bonsai Lane, Green City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bonsai. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
