import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { jwtDecode } from "jwt-decode"; // Default import for jwt-decode
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
} from "@mui/material"; // Material UI components
import "./re_signin_forms.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation

    try {
      const response = await fetch("https://motodesk2-o.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      setLoading(false); // Stop loading animation

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token); // Store token in localStorage

        const decoded = jwtDecode(token); // Decode the JWT token
        const userName = decoded.name;
        const userlogin = decoded.username;

        // Check if the username is Admin@123
        if (decoded.username === "Admin@123") {
          // Navigate to admin dashboard
          navigate("/admin", { state: { userName ,userlogin} });
        } else {
          // Navigate to regular user dashboard
          navigate("/dashboard", { state: { userName ,userlogin} });
        }
      } else {
        const error = await response.text();
        alert(`Login Failed: ${error}`);
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Handle Register click to navigate to RegisterForm page
  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to RegisterForm
  };

  // Ensure loginwithgoogle function works correctly
  const loginwithgoogle = React.useCallback(() => {
    window.open("https://motodesk2-o.onrender.com/auth/google", "_self");
  }, []);

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Welcome back!</h2>
        <p>Enter your credentials to access your account</p>
        <br />
        <form onSubmit={handleLogin} className="form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="register-link">
          New Dealer?{" "}
          <span onClick={handleRegisterClick} className="register-text">
            Register
          </span>
        </p>
        <br />

        <center>
          {/* Ensure loginwithgoogle function works correctly */}
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </center>
      </div>

      <div className="image-container">
        <img src="/assets/images/carl.png" alt="Car" className="car-image" />
      </div>

      <Dialog
        open={loading}
        PaperProps={{ style: { borderRadius: 10, padding: "20px" } }}
      >
        <DialogContent style={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Signing you in...
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInForm;
