import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminProfile from './AdminProfile';

describe('<AdminProfile />', () => {
  test('it should mount', () => {
    render(<AdminProfile />);
    
    const adminProfile = screen.getByTestId('AdminProfile');

    expect(adminProfile).toBeInTheDocument();
  });
});