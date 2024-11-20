/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react'; // Import the necessary functions
import AddCategory from "../../components/AddCategory";


describe('Testing the component <AddCategory/>', () => {
  // Group of tests for the <AddCategory/> component.

  test('should change the value of the text box', () => {
    // Test to verify if typing into the input box updates its value.

    render(<AddCategory handleAddCategory={() => { }} />);
    // Render the AddCategory component with a dummy function for the handleAddCategory prop.

    const input = screen.getByRole('textbox');
    // Select the text input element.

    fireEvent.input(input, { target: { value: 'Pokemon' } });
    // Simulate a user typing 'Pokemon' into the input box.

    expect(input.value).toBe('Pokemon');
    // Assert that the input's value is updated correctly.
  });

  test('should call onNewCategory if the input has a value', () => {
    // Test to verify the handleAddCategory function is called with the correct value when the form is submitted.

    const inputValue = 'Pikachu';
    // Value to simulate user input.
    const handleAddCategory = jest.fn();
    // Mock function to test the behavior of handleAddCategory.

    render(<AddCategory handleAddCategory={handleAddCategory} />);
    // Render the component with the mocked handleAddCategory function.

    const input = screen.getByRole('textbox');
    // Select the text input element.
    const form = screen.getByRole('form');
    // Select the form element.

    fireEvent.input(input, { target: { value: inputValue } });
    // Simulate user typing the inputValue ('Pikachu') into the input box.
    fireEvent.submit(form);
    // Simulate form submission.

    expect(input.value).toBe('');
    // Assert that the input is cleared after submission.

    expect(handleAddCategory).toHaveBeenCalled();
    // Assert that handleAddCategory was called.
    expect(handleAddCategory).toHaveBeenCalledTimes(1);
    // Assert that handleAddCategory was called exactly once.
    expect(handleAddCategory).toHaveBeenCalledWith(inputValue);
    // Assert that handleAddCategory was called with the correct input value.
  });

  test('should not call onNewCategory if the input is empty', () => {
    // Test to verify that handleAddCategory is not called when the input is empty.

    const handleAddCategory = jest.fn();
    // Mock function to test behavior when the input is empty.
    render(<AddCategory handleAddCategory={handleAddCategory} />);
    // Render the component with the mocked handleAddCategory function.

    const form = screen.getByRole('form');
    // Select the form element.
    fireEvent.submit(form);
    // Simulate form submission without any input value.

    expect(handleAddCategory).not.toHaveBeenCalled();
    // Assert that handleAddCategory was not called.
  });
});