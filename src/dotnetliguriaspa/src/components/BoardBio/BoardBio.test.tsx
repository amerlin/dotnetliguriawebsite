import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BoardBio from './BoardBio';

describe('<BoardBio />', () => {
    test('it should mount', () => {
        render(<BoardBio profile={{
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            imageUrl: 'https://example.com/image.jpg',
            profileImageUrl: 'https://example.com/profile.jpg',
            profileBio: 'This is a test biography for the board member.',
            description: 'Software Engineer & MVP'
        }} />);

        const boardBio = screen.getByTestId('BoardBio');

        expect(boardBio).toBeInTheDocument();
    });
});
