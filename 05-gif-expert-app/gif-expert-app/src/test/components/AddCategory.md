#### Component: `AddCategory`

The `AddCategory` component provides a controlled input field that allows users to input a string. On form submission, the `handleAddCategory` function is called with the trimmed input value, provided the input has more than one character.

```javascript
import PropTypes from "prop-types";
import { useState } from "react";

function AddCategory({ handleAddCategory }) {
    const [inputValue, setInputValue] = useState('');
    // Local state to control the value of the input field.

    const onSubmit = (e) => {
        e.preventDefault();
        // Prevent the default form submission behavior.
        if (inputValue.trim().length <= 1) return;
        // Do nothing if the trimmed input value is empty or too short.
        setInputValue('');
        // Clear the input field.
        handleAddCategory(inputValue.trim());
        // Call the parent function with the trimmed input value.
    };

    return (
        <form onSubmit={onSubmit} aria-label="form">
            {/* Accessible form for submitting a category */}
            <input
                type="text"
                placeholder="Search for gifs"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    // Update the input value state as the user types.
                }}
            />
        </form>
    );
}

export default AddCategory;

AddCategory.propTypes = {
    handleAddCategory: PropTypes.func.isRequired,
    // Prop validation ensures the component receives a function as the handleAddCategory prop.
};
```

---

### Test Cases

#### Test 1: Updating the Input Value

```javascript
test('should change the value of the text box', () => {
    render(<AddCategory handleAddCategory={() => { }} />);
    // Render the AddCategory component with a dummy handleAddCategory function.

    const input = screen.getByRole('textbox');
    // Query the input element by its role.

    fireEvent.input(input, { target: { value: 'Pokemon' } });
    // Simulate a user typing "Pokemon" into the input field.

    expect(input.value).toBe('Pokemon');
    // Assert that the input field's value matches the user's input.
});
```

**Purpose:**  
This test ensures the input field updates its value based on user input. 

---

#### Test 2: Submitting a Valid Input

```javascript
test('should call onNewCategory if the input has a value', () => {
    const inputValue = 'Pikachu';
    const handleAddCategory = jest.fn();
    // Mock the handleAddCategory function to track calls.

    render(<AddCategory handleAddCategory={handleAddCategory} />);
    // Render the AddCategory component with the mocked function.

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    // Query the input and form elements by their roles.

    fireEvent.input(input, { target: { value: inputValue } });
    // Simulate typing the input value ('Pikachu').
    fireEvent.submit(form);
    // Simulate form submission.

    expect(input.value).toBe('');
    // Assert that the input field is cleared after submission.

    expect(handleAddCategory).toHaveBeenCalled();
    expect(handleAddCategory).toHaveBeenCalledTimes(1);
    expect(handleAddCategory).toHaveBeenCalledWith(inputValue);
    // Assert that the handleAddCategory function was called exactly once with the correct argument.
});
```

**Purpose:**  
This test verifies that when a valid input is submitted:
- The form clears the input field.
- The `handleAddCategory` function is called once with the trimmed input value.

---

#### Test 3: Submitting an Empty Input

```javascript
test('should not call onNewCategory if the input is empty', () => {
    const handleAddCategory = jest.fn();
    // Mock the handleAddCategory function to track calls.

    render(<AddCategory handleAddCategory={handleAddCategory} />);
    // Render the AddCategory component with the mocked function.

    const form = screen.getByRole('form');
    // Query the form element by its role.

    fireEvent.submit(form);
    // Simulate form submission with an empty input.

    expect(handleAddCategory).not.toHaveBeenCalled();
    // Assert that the handleAddCategory function was not called.
});
```

**Purpose:**  
This test ensures that the form does not call `handleAddCategory` if the input is empty, preventing unnecessary or invalid submissions.

---

### Summary of the Tests

1. **Value Update:** Confirms that the controlled input behaves as expected when the user types.
2. **Valid Submission:** Ensures valid input calls the `handleAddCategory` function and clears the input field afterward.
3. **Invalid Submission:** Verifies that the form ignores empty inputs and does not call the `handleAddCategory` function.