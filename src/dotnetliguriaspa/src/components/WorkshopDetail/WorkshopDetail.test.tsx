import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkshopDetail from './WorkshopDetail';

describe('<WorkshopDetail />', () => {
  test('it should mount', () => {
    render(<WorkshopDetail pageName='' />);

    const workshopDetail = screen.getByTestId('WorkshopDetail');

    expect(workshopDetail).toBeInTheDocument();
  });
});