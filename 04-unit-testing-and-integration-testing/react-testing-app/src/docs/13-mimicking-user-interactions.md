# Mimicking User Interactions

In React Testing Library (RTL), mimicking user interactions involves simulating events that users can trigger in a real application, such as clicking a button, typing in an input field, or submitting a form. This helps ensure that your components behave as expected when users interact with them.

RTL provides utility functions like `fireEvent` and `user-event` to simulate these interactions.

### 1. **Using `fireEvent` to Mimic User Interactions**

The `fireEvent` utility allows you to trigger native DOM events, such as click, change, submit, and key press. It's the more manual approach to simulate interactions, where you specify the event type directly.

#### Example 1: Clicking a Button with `fireEvent`

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

function ButtonClick() {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => setClicked(true);

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      {clicked && <p>Button Clicked!</p>}
    </div>
  );
}

test('mimics a button click', () => {
  render(<ButtonClick />);
  
  // Button is not clicked initially
  expect(screen.queryByText('Button Clicked!')).toBeNull();
  
  // Fire a click event on the button
  fireEvent.click(screen.getByText('Click Me'));
  
  // After click, the message should appear
  expect(screen.getByText('Button Clicked!')).toBeInTheDocument();
});
```

#### Example 2: Typing in an Input Field with `fireEvent`

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

function InputForm() {
  const [text, setText] = React.useState('');

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
}

test('mimics typing in an input field', () => {
  render(<InputForm />);
  
  // Initially, the input is empty
  expect(screen.getByText('You typed:')).toHaveTextContent('You typed:');
  
  // Fire a change event and simulate typing
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello, RTL!' } });
  
  // After typing, the text should update
  expect(screen.getByText('You typed: Hello, RTL!')).toBeInTheDocument();
});
```

---

### 2. **Using `user-event` to Mimic User Interactions**

`user-event` is a higher-level library that simulates user interactions in a way that’s closer to how real users interact with your application. It’s built on top of `fireEvent` but provides a more natural simulation, handling delays and focus/blur events more realistically.

To install `user-event`:
```bash
npm install @testing-library/user-event
```

#### Example 1: Clicking a Button with `user-event`

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function ButtonClick() {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => setClicked(true);

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      {clicked && <p>Button Clicked!</p>}
    </div>
  );
}

test('mimics a button click using user-event', async () => {
  render(<ButtonClick />);
  
  // Button is not clicked initially
  expect(screen.queryByText('Button Clicked!')).toBeNull();
  
  // Mimic a user click using user-event
  await userEvent.click(screen.getByText('Click Me'));
  
  // After click, the message should appear
  expect(screen.getByText('Button Clicked!')).toBeInTheDocument();
});
```

#### Example 2: Typing in an Input Field with `user-event`

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function InputForm() {
  const [text, setText] = React.useState('');

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
}

test('mimics typing in an input field using user-event', async () => {
  render(<InputForm />);
  
  // Initially, the input is empty
  expect(screen.getByText('You typed:')).toHaveTextContent('You typed:');
  
  // Mimic typing using user-event
  await userEvent.type(screen.getByRole('textbox'), 'Hello, user-event!');
  
  // After typing, the text should update
  expect(screen.getByText('You typed: Hello, user-event!')).toBeInTheDocument();
});
```

---

### 3. **Mimicking More Complex User Interactions**

User interactions often involve more than simple clicks or typing. You can simulate complex actions like submitting forms, selecting options from dropdowns, or hovering over elements.

#### Example: Submitting a Form with `user-event`

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function FormSubmit() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your name" />
      <button type="submit">Submit</button>
      {submitted && <p>Form Submitted!</p>}
    </form>
  );
}

test('mimics form submission', async () => {
  render(<FormSubmit />);
  
  // Initially, the form is not submitted
  expect(screen.queryByText('Form Submitted!')).toBeNull();
  
  // Mimic typing and submitting the form
  await userEvent.type(screen.getByPlaceholderText('Your name'), 'John Doe');
  await userEvent.click(screen.getByText('Submit'));
  
  // After submission, the form should be submitted
  expect(screen.getByText('Form Submitted!')).toBeInTheDocument();
});
```

#### Example: Selecting an Option from a Dropdown with `user-event`

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function Dropdown() {
  const [selected, setSelected] = React.useState('');

  const handleChange = (e) => setSelected(e.target.value);

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <p>You selected: {selected}</p>
    </div>
  );
}

test('mimics selecting an option from a dropdown', async () => {
  render(<Dropdown />);
  
  // Initially, no option is selected
  expect(screen.getByText('You selected:')).toHaveTextContent('You selected:');
  
  // Mimic selecting an option using user-event
  await userEvent.selectOptions(screen.getByRole('combobox'), 'option1');
  
  // After selecting, the text should update
  expect(screen.getByText('You selected: option1')).toBeInTheDocument();
});
```

---

### Summary of Common User Interactions

| Interaction            | `fireEvent` Example                          | `user-event` Example                         |
|------------------------|---------------------------------------------|---------------------------------------------|
| **Click**              | `fireEvent.click(button)`                    | `await userEvent.click(button)`             |
| **Type in Input**      | `fireEvent.change(input, { target: { value: 'text' } })` | `await userEvent.type(input, 'text')`       |
| **Submit Form**        | `fireEvent.submit(form)`                     | `await userEvent.click(submitButton)`       |
| **Select Option**      | `fireEvent.change(select, { target: { value: 'option1' } })` | `await userEvent.selectOptions(select, 'option1')` |

---

### Conclusion

- **`fireEvent`** is a low-level utility that directly triggers DOM events.
- **`user-event`** simulates real user interactions with a higher-level API and is often the preferred approach for mimicking user actions in tests.
- Both utilities allow you to simulate actions like clicks, typing, form submission, and selecting options, ensuring that your components behave correctly when users interact with them.

When writing tests for user interactions, it’s generally a good practice to use `user-event` over `fireEvent` because it mimics real user behavior more accurately.