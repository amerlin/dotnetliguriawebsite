import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminTopMenu from './AdminTopMenu';

describe('<AdminTopMenu />', () => {
	test('it should mount', () => {
		render(<AdminTopMenu />);

		const adminTopMenu = screen.getByText('Top Menu');

		expect(adminTopMenu).toBeInTheDocument();
	});
});
