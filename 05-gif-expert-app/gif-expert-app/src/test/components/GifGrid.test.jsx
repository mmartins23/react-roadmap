/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import GifGrid from '../../components/GifGrid';
import { useFetchGifs } from '../../hooks/useFetchGifs.js';


jest.mock('../../src/hooks/useFetchGifs.js');


describe('Pruebas en <GifGrid />', () => {
    
    const category = 'One Punch';

    test('should display loading initially', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });


        render( <GifGrid category={ category } /> );
        expect( screen.getByText( 'Loading...' ) );
        expect( screen.getByText( category ) );

    });

    test('should display items when images are loaded from useFetchGifs', () => {
        
        const gifs = [
            {
                id: 'ABC',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg'
            },
            {
                id: '123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
            },
        ]

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        });

        render( <GifGrid category={ category } /> );
        expect( screen.getAllByRole('img').length ).toBe(2);
        


    });


});