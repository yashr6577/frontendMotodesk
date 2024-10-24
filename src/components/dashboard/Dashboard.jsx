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

  useEffect(() => {
    if (location.state?.userName) {
      setUserName(location.state.userName);
    } else {
      navigate('/login'); // Redirect to login if no user data
    }
  }, [location, navigate]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'sales':
        return <SalesContent />;
      case 'inventory':
        return <InventoryContent />;
      case 'customer':
        return <CustomerContent />;
      case 'catalog':
        return <CatalogContent />;
      case 'dashboard':
      default:
        return <DashboardContent />;
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
