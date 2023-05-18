import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShowPermissions from './ShowPermissions';

describe('<ShowPermissions />', () => {
  test('it should mount', () => {
    render(<ShowPermissions />);
    
    const showPermissions = screen.getByTestId('ShowPermissions');

    expect(showPermissions).toBeInTheDocument();
  });
});