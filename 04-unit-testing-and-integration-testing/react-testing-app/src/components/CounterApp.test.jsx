import { render, screen } from "@testing-library/react"; 
import user from "@testing-library/user-event"; 
import '@testing-library/jest-dom'; 
import CounterApp from "./CounterApp";


describe('Testing the <CounterApp /> Component', () => {
    const initialValue = 0; // Shared initial value for the counter across tests

    // Test 1: Rendering the component with the initial value
    test('renders the component with the initial value', () => {
        render(<CounterApp value={initialValue} />);

        // Check if the component header is rendered
        const headingElement = screen.getByRole('heading', { name: /CounterApp/i });
        expect(headingElement).toBeInTheDocument();

        // Check if the counter displays the correct initial value
        const counterElement = screen.getByRole('heading', { level: 2 });
        expect(counterElement).toHaveTextContent(initialValue.toString());
    });

    // Test 2: Increment functionality
    test('increments the counter by 1 when the Increment button is clicked', async () => {
        user.setup(); // Set up user-event
        render(<CounterApp value={initialValue} />);

        // Locate the Increment button and simulate a click
        const incrementButton = screen.getByRole('button', { name: /Increment/i });
        await user.click(incrementButton);

        // Verify the counter value is incremented
        const counterElement = screen.getByRole('heading', { level: 2 });
        expect(counterElement).toHaveTextContent((initialValue + 1).toString());
    });

    // Test 3: Decrement functionality
    test('decrements the counter by 1 when the Decrement button is clicked', async () => {
        user.setup();
        render(<CounterApp value={initialValue} />);

        // Locate the Decrement button and simulate a click
        const decrementButton = screen.getByRole('button', { name: /Decrement/i });
        await user.click(decrementButton);

        // Verify the counter value is decremented
        const counterElement = screen.getByRole('heading', { level: 2 });
        expect(counterElement).toHaveTextContent((initialValue - 1).toString());
    });

    // Test 4: Reset functionality
    test('resets the counter to the initial value when the Reset button is clicked', async () => {
        user.setup();
        render(<CounterApp value={initialValue} />);

        // Locate the Increment and Reset buttons
        const incrementButton = screen.getByRole('button', { name: /Increment/i });
        const resetButton = screen.getByRole('button', { name: /Reset/i });

        // Simulate a click on the Increment button to change the counter
        await user.click(incrementButton);

        // Simulate a click on the Reset button
        await user.click(resetButton);

        // Verify the counter resets to the initial value
        const counterElement = screen.getByRole('heading', { level: 2 });
        expect(counterElement).toHaveTextContent(initialValue.toString());
    });
});
