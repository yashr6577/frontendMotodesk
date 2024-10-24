import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Contact our Sales Department</p>
          <p className="phone-number">📞 +91 9876543210</p>
          <div className="working-hours">
            <p>Monday: 9:00–13:00</p>
            <p>Tuesday: 9:00–13:00</p>
            <p>Wednesday: 9:00–13:00</p>
            <p>Thursday: 9:00–13:00</p>
            <p>Friday: 9:00–13:00</p>
            <p>Saturday: 9:00–13:00</p>
            <p>Sunday: CLOSED</p>
          </div>
        </div>
        <div className="map-container">
          {/* You can replace the iframe below with any other map embed or API you prefer */}
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609936593!2d72.74110104743123!3d19.082522326698192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63b17f2ba0f%3A0x7156c5f0c2032a45!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1643972918569!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
