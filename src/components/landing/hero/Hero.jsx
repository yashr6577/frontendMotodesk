// Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click
  const handleSignIn = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <>
      <div className="hero-container">
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
        <button className="hero-button" onClick={handleSignIn}> {/* Attach onClick */}
          <span role="img" aria-label="sparkle">
            ✨
          </span>{" "}
          Sign In
        </button>
      </center>
    </>
  );
};

export default Hero;
