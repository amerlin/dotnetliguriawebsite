import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomSideBar from './CustomSideBar';

describe('<CustomSideBar />', () => {
  test('it should mount', () => {
    render(<CustomSideBar />);
    
    const customSideBar = screen.getByTestId('CustomSideBar');

    expect(customSideBar).toBeInTheDocument();
  });
});