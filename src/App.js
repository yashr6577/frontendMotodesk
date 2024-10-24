import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components
import './App.css';
// import HomePage from './components/landing/HomePage'; // Import HomePage component
import SignInForm from './components/forms/SignInForm'; // Import SignInPage component
import RegistrationForm from './components/forms/RegistrationForm';
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import LandingPage from "./components/LandingPage";
// import { Home } from "@mui/icons-material";

function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    
    <Router>
      <div className="App">
        {/* Define the routes for different pages */}
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<SignInForm />} /> {/* Route for Sign In Page */}
          <Route path="/register" element={<RegistrationForm />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
