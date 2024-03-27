import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Workshops from './Workshops';

describe('<Workshops />', () => {
  test('it should mount', () => {
    render(<Workshops pageName={""}/>);
    
    const workshops = screen.getByTestId('Workshops');

    expect(workshops).toBeInTheDocument();
  });
});