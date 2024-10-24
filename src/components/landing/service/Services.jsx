import React from 'react';
import './Services.css';

// Example images added to the servicesData array
const servicesData = [
  {
    title: 'Dealership Management',
    description: 'Our system streamlines dealership operations by managing inventory, tracking sales, and handling customer details. It’s an all-in-one solution that simplifies your work, boosts efficiency, and helps grow your business.',
    image: '/assets/dealer_mg.png',
  },
  {
    title: 'Sales Management',
    description: 'Enables dealers to manage the entire sales process, including recording sales, updating customer details, and processing transactions. This feature ensures that all sales activities are documented and accessible.',
    image: '/assets/sales_mg.png',
  },
  {
    title: 'Customer Management',
    description: 'Allows dealers to manage customer information, including contact details, purchase history, and preferences.',
    image: '/assets/customer_mg.png',
  },
  {
    title: 'Inventory Management',
    description: 'Provides dealers with the ability to manage the dealership’s inventory. Dealers can add, update, or remove vehicles from the inventory, and track stock levels.',
    image: '/assets/inventory_mg.png',
  },
  {
    title: 'Analytics',
    description: 'Allows dealers and admins to view analytics on sales performance, customer behavior, and inventory turnover. This feature provides graphical representations and insights to help users make data-driven decisions.',
    image: '/assets/analytics.png',
  },
];

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Services We Offer</h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <img src={service.image} alt={service.title} className="service-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
