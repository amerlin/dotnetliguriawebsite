import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminLayout from './AdminLayout';

describe('<AdminLayout />', () => {
  test('it should mount', () => {
    render(<AdminLayout />);
    
    const adminLayout = screen.getByTestId('AdminLayout');

    expect(adminLayout).toBeInTheDocument();
  });
});