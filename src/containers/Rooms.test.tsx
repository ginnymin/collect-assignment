import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Rooms from './Rooms';

test('loads and displays rooms', async () => {
    render(<Rooms />)

    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByRole('heading')).toHaveTextContent('Rooms')

    // should use a mock API to test this instead
    await waitFor(() => screen.getAllByRole('article'))
    expect(screen.getAllByRole('article')).toHaveLength(8)
})
