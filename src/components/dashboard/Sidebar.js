// src/components/Sidebar.js
import React from "react";
import { 
  FaTachometerAlt, 
  FaChartLine, 
  FaWarehouse, 
  FaUsers, 
  FaBookOpen 
} from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import './styles/Sidebar.css';

function Sidebar({ setSelectedOption, selectedOption, role }) {
  // Define menu items for both roles
  const dashboardMenu = [
    { label: 'dashboard', icon: <FaTachometerAlt /> },
    { label: 'sales', icon: <FaChartLine /> },
    { label: 'inventory', icon: <FaWarehouse /> },
    { label: 'customer', icon: <FaUsers /> },
    { label: 'catalog', icon: <FaBookOpen /> },
  ];

  const adminMenu = [
    { label: 'dashboard', icon: <FaTachometerAlt /> },
    { label: 'sales', icon: <FaChartLine /> },
    { label: 'collection', icon: <FaWarehouse /> },
  ];

  // Choose which menu to display based on the role
  const menuItems = role === 'admin' ? adminMenu : dashboardMenu;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#000',
        },
      }}
    >
      <div className="logo">
        <img src="/logo.png" alt="Motodesk" className="sidebar-logo" />
      </div>

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.label}
            onClick={() => setSelectedOption(item.label)}
            className={selectedOption === item.label ? 'active' : ''}
          >
            <ListItemIcon>
              {React.cloneElement(item.icon, { 
                style: { color: selectedOption === item.label ? '#3498db' : '#000' } 
              })}
            </ListItemIcon>
            <ListItemText primary={item.label.charAt(0).toUpperCase() + item.label.slice(1)} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
