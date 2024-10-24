import React from 'react';
import '../../styles/homepage.css'; // Create a separate CSS file for styling
import Navbar from './navbar/Navbar';
import Hero from './hero/Hero';
import Services from './service/Services';
import Footer from './footer/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      
      {/* Hero Section with an ID */}
      <div id="hero-section">
        <Hero />
      </div>
      
      {/* Services Section with an ID */}
      <div id="services-section">
        <Services />
      </div>
      
      {/* Footer Section with an ID */}
      <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
};


export default HomePage;
