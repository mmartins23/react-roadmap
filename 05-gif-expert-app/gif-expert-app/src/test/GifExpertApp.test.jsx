/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import GifExpertApp from '../components/GifExpertApp';

jest.setTimeout(30000);

describe('Tests for <GifExpertApp />', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset all mocks
    });
    
    test('should render the title and initial category', () => {
        render(<GifExpertApp />);

        // Check title is rendered
        expect(screen.getByText('GifExpertApp')).toBeInTheDocument();

        // Check initial category is rendered
        expect(screen.getByText('One Punch')).toBeInTheDocument();
    });
});
