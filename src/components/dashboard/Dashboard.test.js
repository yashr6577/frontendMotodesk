// src/components/dashboard/Dashboard.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

jest.mock('./Sidebar', () => ({ setSelectedOption }) => (
  <div>
    <button onClick={() => setSelectedOption('dashboard')}>Dashboard</button>
    <button onClick={() => setSelectedOption('sales')}>Sales</button>
    <button onClick={() => setSelectedOption('inventory')}>Inventory</button>
    <button onClick={() => setSelectedOption('customer')}>Customer</button>
    <button onClick={() => setSelectedOption('catalog')}>Catalog</button>
  </div>
));

// Add mocks for content components if needed
jest.mock('./DashboardContent', () => () => <div>Dashboard Content</div>);
jest.mock('./SalesContent', () => () => <div>Sales Content</div>);
jest.mock('./InventoryContent', () => () => <div>Inventory Content</div>);
jest.mock('./CustomerContent', () => () => <div>Customer Content</div>);
jest.mock('./CatalogContent', () => () => <div>Catalog Content</div>);

describe('Dashboard Component', () => {
  test('renders dashboard content by default', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { userName: 'Test User' } }]}>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  test('renders sales content when "Sales" button is clicked', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { userName: 'Test User' } }]}>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sales'));
    expect(screen.getByText('Sales Content')).toBeInTheDocument();
  });
});
