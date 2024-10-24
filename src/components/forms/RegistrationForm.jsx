// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Dialog, DialogContent } from '@mui/material';
import './re_signin_forms.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation

    try {
      const response = await fetch('https://motodesk2-o.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setLoading(false); // Stop loading animation

      if (response.ok) {
        alert('Registration Successful! Redirecting to Login...');
        navigate('/login'); // Redirect to login page
      } else {
        const error = await response.text();
        alert(`Registration Failed: ${error}`);
      }
    } catch (error) {
      setLoading(false); // Stop loading animation on error
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const handleSigninClick = () => {
    navigate('/login');
  };

  return (
    <div className="form-page">
      <div className="image-container">
        <img src="/assets/images/carl.png" alt="Car" className="car-image" />
      </div>
      <div className="form-container">
        <h2>Get Started Now</h2>
        <form onSubmit={handleRegister} className='form'>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <p className="register-link">
          Have an account?{' '}
          <span onClick={handleSigninClick} className="register-text">
            Sign In
          </span>
        </p>
      </div>

      {/* Loading Dialog */}
      <Dialog open={loading} PaperProps={{ style: { borderRadius: 10, padding: '20px' } }}>
        <DialogContent style={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Registering your account...
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationForm;
