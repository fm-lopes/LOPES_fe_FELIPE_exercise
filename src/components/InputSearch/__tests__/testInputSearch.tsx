import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import InputSearch from '..';

describe('InputSearch', () => {
    it('should render InputSearch', () => {
        render(<InputSearch />);

        expect(screen.getByTestId('input-search')).toBeInTheDocument();
    });

    test('calls onChange prop with lowercased text', () => {
        const handleChange = jest.fn();
        render(<InputSearch onChange={handleChange} />);
        fireEvent.keyDown(screen.getByTestId('input-search'), {key: 'A', code: 'KeyA'});
        waitFor(() => {
            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith('a');
        })
    });
});
