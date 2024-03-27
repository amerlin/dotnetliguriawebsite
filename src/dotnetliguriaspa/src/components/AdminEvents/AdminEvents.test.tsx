import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminEvents from './AdminEvents';

describe('<AdminEvents />', () => {
  test('it should mount', () => {
    render(<AdminEvents />);
    
    const adminEvents = screen.getByTestId('AdminEvents');

    expect(adminEvents).toBeInTheDocument();
  });
});