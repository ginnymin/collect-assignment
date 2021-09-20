import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import Room from './Room';

describe('room with spots', () => {
    beforeEach(() => {
        render(<Room id="test01" title="Test Room" spots={10} />)
    });

    it('loads and displays room', async () => {
        await waitFor(() => screen.getByRole('heading'))
        expect(screen.getByRole('heading')).toHaveTextContent('Test Room')

        await waitFor(() => screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveTextContent('Book!')
        expect(screen.getByRole('button')).not.toBeDisabled()
    });

    it('confirm buttons shown after clicking book', async () => {
        await fireEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('heading')).toHaveTextContent('Book Test Room?')
        expect(screen.getByRole('button', { name: 'Yes' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'No' })).toBeTruthy()
    });

    it('return to book button after clicking no', async () => {
        await fireEvent.click(screen.getByRole('button'))

        await waitFor(() => screen.getByRole('button', { name: 'No' }))
        await fireEvent.click(screen.getByRole('button', { name: 'No' }))

        await waitFor(() => screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveTextContent('Book!')
    });

    it('disabled button after clicking yes', async () => {
        await fireEvent.click(screen.getByRole('button'))

        await waitFor(() => screen.getByRole('button', { name: 'Yes' }))
        await fireEvent.click(screen.getByRole('button', { name: 'Yes' }))

        expect(screen.getByRole('button')).toBeDisabled()

        await waitFor(() => screen.getByTitle('pending'))
        await waitFor(() => screen.getByTitle('success'))

        expect(screen.getByRole('button')).toBeDisabled()
    });
});

describe('room without spots', () => {
    beforeEach(() => {
        render(<Room id="test01" title="Test Room" spots={0} />)
    });

    it('loads and displays room', async () => {
        await waitFor(() => screen.getByRole('heading'))
        expect(screen.getByRole('heading')).toHaveTextContent('Test Room')

        await waitFor(() => screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveTextContent('Full')
        expect(screen.getByRole('button')).toBeDisabled()
    });
});
