// src/components/Header.js
import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaTimes } from "react-icons/fa";
import './styles/Header.css';

function Header({ selectedOption, userName }) { // Accept userName prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <div className="header">
      <div className="header-left">
        <h1>{selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}</h1>
        <p>Hi, {userName}. Welcome back to MotoDesk!</p> {/* Display user’s name */}
      </div>
      <div className="header-right" onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
        <h3>Hello, {userName}</h3> {/* Display user’s name */}
        <FaUserCircle size={40} />
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <p onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <FaSignOutAlt color="#f44336" /> Logout
          </p>
          <p onClick={() => setIsMenuOpen(false)} style={{ cursor: 'pointer' }}>
            <FaTimes color="#2196F3" /> Cancel
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
