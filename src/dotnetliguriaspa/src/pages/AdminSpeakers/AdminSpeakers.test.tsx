import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminSpeakers from './AdminSpeakers';

describe('<AdminSpeakers />', () => {
  test('it should mount', () => {
    render(<AdminSpeakers />);
    
    const adminSpeakers = screen.getByTestId('AdminSpeakers');

    expect(adminSpeakers).toBeInTheDocument();
  });
});