import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthQuestionario from './AuthQuestionario';

describe('<AuthQuestionario />', () => {
  test('it should mount', () => {
    render(<AuthQuestionario />);
    
    const authQuestionario = screen.getByTestId('AuthQuestionario');

    expect(authQuestionario).toBeInTheDocument();
  });
});