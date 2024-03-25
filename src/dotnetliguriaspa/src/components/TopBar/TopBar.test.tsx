import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopBar from './TopBar';

describe('<TopBar />', () => {
  test('it should mount', () => {
    render(<TopBar pageName={"Test"} showMenu={false} />);
    
    const topBar = screen.getByTestId('TopBar');

    expect(topBar).toBeInTheDocument();
  });
});