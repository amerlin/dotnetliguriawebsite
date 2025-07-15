import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeMainBox from './HomeMainBox';

describe('<HomeMainBox />', () => {
  test('it should mount', () => {
    render(<HomeMainBox pagename={""}/>);
    
    const homeMainBox = screen.getByTestId('HomeMainBox');

    expect(homeMainBox).toBeInTheDocument();
  });
});