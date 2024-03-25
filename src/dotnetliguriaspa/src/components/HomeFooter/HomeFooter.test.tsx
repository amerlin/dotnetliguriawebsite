import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeFooter from './HomeFooter';

describe('<HomeFooter />', () => {
  test('it should mount', () => {
    render(<HomeFooter />);
    
    const homeFooter = screen.getByTestId('HomeFooter');

    expect(homeFooter).toBeInTheDocument();
  });
});