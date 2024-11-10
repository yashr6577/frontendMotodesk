// SignInForm.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignInForm from './SignInForm';

// Mock jwtDecode since we are not testing the actual decoding process here
jest.mock("jwt-decode", () => () => ({ username: "TestUser" }));

describe('SignInForm Component', () => {
  test('renders login form elements', () => {
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    // Check if the username input field is rendered
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();

    // Check if the password input field is rendered
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    // Check if the "Sign In" button in the form is rendered
    expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument();

    // Check if the "Sign In With Google" button is rendered
    expect(screen.getByRole('button', { name: /Sign In With Google/i })).toBeInTheDocument();

    // Check if the "Register" link text is rendered
    expect(screen.getByText(/New Dealer\?/i)).toBeInTheDocument();
  });
});
