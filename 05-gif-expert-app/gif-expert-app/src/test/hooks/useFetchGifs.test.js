/* eslint-disable no-undef */
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import 'whatwg-fetch';


describe('Tests in the hook useFetchGifs', () => {
    
    test('should return the initial state', () => {

        const { result } = renderHook( () => useFetchGifs('Pokemon') );
        const { images, isLoading } = result.current;
        
        expect( images.length ).toBe(0);
        expect( isLoading ).toBeTruthy();

    });

    test('should return an array of images and isLoading in false', async() => {

        const { result } = renderHook( () => useFetchGifs('Pokemon') );
        
        await waitFor(
            () => expect( result.current.images.length ).toBeGreaterThan(0)
        );
                
        const { images, isLoading } = result.current;
        
        expect( images.length ).toBeGreaterThan(0);
        expect( isLoading ).toBeFalsy();

    });

});