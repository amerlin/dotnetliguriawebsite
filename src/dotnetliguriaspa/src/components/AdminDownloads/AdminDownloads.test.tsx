import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminDownloads from './AdminDownloads';

describe('<AdminDownloads />', () => {
  test('it should mount', () => {
    render(<AdminDownloads pageName={''} />);
    
    const adminDownloads = screen.getByTestId('AdminDownloads');

    expect(adminDownloads).toBeInTheDocument();
  });
});