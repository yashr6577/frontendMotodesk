import React from 'react';
import './navbar.css';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <img src='/logo.png' alt="MotoDesk Logo" className="logo-icon" />
        
      </div>
      <div className="navbar">
        <a href="#home" className="nav-item active" onClick={() => scrollToSection('hero-section')}>Home</a>
        <a href="#services" className="nav-item" onClick={() => scrollToSection('services-section')}>Services</a>
        <a href="#contact" className="nav-item" onClick={() => scrollToSection('footer-section')}>Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
