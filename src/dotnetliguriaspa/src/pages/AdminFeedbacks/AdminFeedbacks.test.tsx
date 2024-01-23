import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminFeedbacks from './AdminFeedbacks';

describe('<AdminFeedbacks />', () => {
  test('it should mount', () => {
    render(<AdminFeedbacks />);

    const adminFeedbacks = screen.getByTestId('AdminFeedbacks');

    expect(adminFeedbacks).toBeInTheDocument();
  });
});