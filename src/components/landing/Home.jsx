import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
//import { Link } from 'react-router-dom';
import "../../styles/home.css"; // Create a separate CSS file for styling

const servicesData = [
  {
    title: "Dealership Management",
    description:
      "Our system streamlines dealership operations by managing inventory, tracking sales, and handling customer details. It’s an all-in-one solution that simplifies your work, boosts efficiency, and helps grow your business.",
    image: "/assets/dealer_mg.png",
  },
  {
    title: "Sales Management",
    description:
      "Enables dealers to manage the entire sales process, including recording sales, updating customer details, and processing transactions. This feature ensures that all sales activities are documented and accessible.",
    image: "/assets/sales_mg.png",
  },
  {
    title: "Customer Management",
    description:
      "Allows dealers to manage customer information, including contact details, purchase history, and preferences.",
    image: "/assets/customer_mg.png",
  },
  {
    title: "Inventory Management",
    description:
      "Provides dealers with the ability to manage the dealership’s inventory. Dealers can add, update, or remove vehicles from the inventory, and track stock levels.",
    image: "/assets/inventory_mg.png",
  },
  {
    title: "Analytics",
    description:
      "Allows dealers and admins to view analytics on sales performance, customer behavior, and inventory turnover. This feature provides graphical representations and insights to help users make data-driven decisions.",
    image: "/assets/analytics.png",
  },
];

const Home = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };
      const navigate = useNavigate(); // Initialize navigate hook
      const handleClick = () => {
        navigate('/signin'); // Navigate to RegisterForm
      };

  return (
    <div className="homepage">
       <div className="navbar-container">
        <div className="logo">
          <img src="/logo1.png" alt="MotoDesk Logo" className="logo-icon" />
          <span className="logo-text">MOTODESK</span>
        </div>
        <div className="navbar">
          <a
            href="#home"
            className="nav-item active"
            onClick={() => scrollToSection("hero-section")}
          >
            Home
          </a>
          <a
            href="#services"
            className="nav-item"
            onClick={() => scrollToSection("services-section")}
          >
            Services
          </a>
          <a
            href="#contact"
            className="nav-item"
            onClick={() => scrollToSection("footer-section")}
          >
            Contact
          </a>
        </div>
      </div>
        
      <div className="hero-container" id="hero-section">
        <div className="hero-content">
          <h1>
            Effortless Dealership
            <br />
            Management, Elevated <br />
            <span className="highlight">Performance.</span>
          </h1>
        </div>
        <div className="hero-image">
          <img src="/assets/homecar.png" alt="Car" />
        </div>
      </div>
      <center>
        <button className="hero-button" onClick={handleClick}>
          <span role="img" aria-label="sparkle">
            ✨
          </span>{" "}
          Sign In
        </button>
      </center>
      

      <div className="services-container" id="services-section">
        <h2 className="services-title">Services We Offer</h2>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="footer-container" id="footer-section">
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
    </div>
  );
};

export default Home;
