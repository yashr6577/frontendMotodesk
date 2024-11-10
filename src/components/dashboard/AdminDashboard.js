// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import AdminSalesContent from './AdminSalesContent';
import AdminInventoryContent from '../dashboard/AdminInventoryContent copy';
import './styles/Dashboard.css';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedOption] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (location.state?.userName) {
      setUserName(location.state.userName);
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'sales':
        return <AdminSalesContent />;
      case 'collection':
        return <AdminInventoryContent />;
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
        role="admin" // Pass role as "admin"
      />
      <div className="main-container">
        <Header selectedOption={selectedMenu} userName={userName} />
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
