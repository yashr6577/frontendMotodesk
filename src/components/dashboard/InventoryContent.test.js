import React from 'react';
import { render, screen } from '@testing-library/react';
import InventoryContent from './InventoryContent'; // Adjust path as necessary
import '@testing-library/jest-dom';

describe('InventoryContent Component', () => {
  test('renders InventoryContent component', async () => {
    // Mocking fetch calls or other setup code goes here
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ orders: [], inventory: [] }), // Adjust based on your API
      })
    );

    const { asFragment } = render(<InventoryContent />);
    
    // You can use await screen.findByText to wait for async components to load
    const availableCarsHeader = await screen.findByText(/Total Available Cars/i);
    expect(availableCarsHeader).toBeInTheDocument();

    // Take a snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
