// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import SalesContent from './SalesContent';
import InventoryContent from './InventoryContent';
import CustomerContent from './CustomerContent';
import CatalogContent from './CatalogContent';
import './styles/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedOption] = useState('dashboard'); // Manage selected menu state
  const [userName, setUserName] = useState('');
  const [userlogin, setUserLogin] = useState('');

  useEffect(() => {
    // Set userName and userlogin from navigation state or redirect if missing
    if (location.state?.userName && location.state?.userlogin) {
      setUserName(location.state.userName);
      setUserLogin(location.state.userlogin);
    } else {
      navigate('/login'); // Redirect to login if no user data
    }
  }, [location, navigate]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'sales':
        return <SalesContent userlogin={userlogin} />;
      case 'inventory':
        return <InventoryContent userlogin={userlogin} />; // Pass userlogin to InventoryContent
      case 'customer':
        return <CustomerContent />;
      case 'catalog':
        return <CatalogContent />;
      case 'dashboard':
      default:
        return <DashboardContent />; // Optionally pass userlogin if needed
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        setSelectedOption={setSelectedOption} 
        selectedOption={selectedMenu} 
        role="dashboard" // Pass role as "dashboard"
      />
      <div className="main-container">
        <Header selectedOption={selectedMenu} userName={userName} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
