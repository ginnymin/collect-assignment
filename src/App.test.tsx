import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

test('loads and displays a body', async () => {
    render(<App />)
    await waitFor(() => screen.getByRole('main'))
    expect(screen.getByRole('main')).toBeInTheDocument()
})
