import { render, screen } from '@testing-library/react';
import SalesContent from './SalesContent'; // Adjust path as necessary
import '@testing-library/jest-dom'; // Use this import instead

test('renders SalesContent component', () => {
    render(<SalesContent />);
    
    // Check if certain elements are present in the document
    expect(screen.getAllByText(/Make Sale/i)).toHaveLength(3); // Adjust the expected length
    expect(screen.getByText(/Generate Report/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Sales/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Orders/i)).toBeInTheDocument();
});

// Additional test
test('submits the sale form', () => {
    render(<SalesContent />);
    const buttons = screen.getAllByText(/Make Sale/i);
    
    expect(buttons[1]).toBeInTheDocument(); // Adjust this based on which button you want to check
    // Add your form submission logic or assertions here
});
