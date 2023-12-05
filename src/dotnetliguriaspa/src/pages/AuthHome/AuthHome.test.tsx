import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthHome from './AuthHome';

describe('<AuthHome />', () => {
  test('it should mount', () => {
    render(<AuthHome />);
    
    const authHome = screen.getByTestId('AuthHome');

    expect(authHome).toBeInTheDocument();
  });
});