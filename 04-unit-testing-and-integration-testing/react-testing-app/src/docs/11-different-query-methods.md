# Different Query Methods

In React Testing Library (RTL), querying methods are used to select DOM elements in your tests. The goal is to simulate how a user would interact with your application, so the library provides a variety of queries that help you find elements based on their content, role, or attributes.

Here’s an overview of the most common query methods in RTL, along with code examples.

### 1. **`getBy` Queries**
`getBy` queries are the most commonly used in RTL and are designed to find elements that must exist in the DOM. They throw an error if no element is found.

#### Examples of `getBy` Queries

- **`getByText()`**
  Finds elements by their text content.
  
  ```javascript
  import { render, screen } from '@testing-library/react';
  
  function Greeting() {
    return <h1>Hello, World!</h1>;
  }
  
  test('renders greeting text', () => {
    render(<Greeting />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
  ```

- **`getByRole()`**
  Finds elements by their ARIA role (e.g., `button`, `textbox`).
  
  ```javascript
  import { render, screen } from '@testing-library/react';

  function SubmitButton() {
    return <button>Submit</button>;
  }

  test('button has correct role', () => {
    render(<SubmitButton />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
  ```

- **`getByLabelText()`**
  Finds form elements associated with a label.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function LoginForm() {
    return (
      <form>
        <label htmlFor="username">Username:</label>
        <input id="username" />
      </form>
    );
  }

  test('finds input by label text', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  });
  ```

- **`getByPlaceholderText()`**
  Finds form inputs by their placeholder text.
  
  ```javascript
  import { render, screen } from '@testing-library/react';

  function SearchBar() {
    return <input placeholder="Search..." />;
  }

  test('finds input by placeholder text', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
  ```

- **`getByTestId()`**
  Finds an element by the `data-testid` attribute.
  
  ```javascript
  import { render, screen } from '@testing-library/react';

  function CustomComponent() {
    return <div data-testid="custom-element">Test</div>;
  }

  test('finds element by test id', () => {
    render(<CustomComponent />);
    expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  });
  ```

---

### 2. **`queryBy` Queries**
`queryBy` queries are similar to `getBy` but they return `null` if no element is found, instead of throwing an error. These queries are useful when the element might not be present in the DOM.

#### Examples of `queryBy` Queries

- **`queryByText()`**
  Returns `null` if the element with the given text is not found.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function Greeting() {
    return <h1>Hello, World!</h1>;
  }

  test('does not display non-existing text', () => {
    render(<Greeting />);
    expect(screen.queryByText('Goodbye, World!')).toBeNull();
  });
  ```

- **`queryByRole()`**
  Returns `null` if the element with the given role is not found.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function SubmitButton() {
    return <button>Submit</button>;
  }

  test('does not find a non-existing button', () => {
    render(<SubmitButton />);
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
  });
  ```

---

### 3. **`findBy` Queries**
`findBy` queries are asynchronous and return a `Promise`. They are useful for waiting for elements to appear in the DOM, such as when content is loaded asynchronously.

#### Example of `findBy` Queries

- **`findByText()`**
  Waits for an element with the given text to appear in the DOM.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function Greeting({ showMessage }) {
    return showMessage ? <h1>Hello, World!</h1> : null;
  }

  test('finds text asynchronously when the message is shown', async () => {
    render(<Greeting showMessage={true} />);
    const element = await screen.findByText('Hello, World!');
    expect(element).toBeInTheDocument();
  });
  ```

- **`findByRole()`**
  Waits for an element with the specified role to appear.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function SubmitButton({ showButton }) {
    return showButton ? <button>Submit</button> : null;
  }

  test('finds button asynchronously', async () => {
    render(<SubmitButton showButton={true} />);
    const button = await screen.findByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });
  ```

---

### 4. **`getAllBy` Queries**
`getAllBy` queries are used when you expect multiple matching elements. They return an array of elements, or throw an error if no elements or more than one element is found.

#### Example of `getAllBy` Queries

- **`getAllByText()`**
  Returns an array of elements that match the given text.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function List() {
    return (
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 1</li>
      </ul>
    );
  }

  test('finds multiple elements by text', () => {
    render(<List />);
    const items = screen.getAllByText('Item 1');
    expect(items).toHaveLength(2);
  });
  ```

---

### 5. **`queryAllBy` Queries**
`queryAllBy` works like `getAllBy` but returns `null` if no elements are found instead of throwing an error.

#### Example of `queryAllBy` Queries

- **`queryAllByText()`**
  Returns `null` if no elements match the text.

  ```javascript
  import { render, screen } from '@testing-library/react';

  function List() {
    return (
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    );
  }

  test('finds no items with a non-existing text', () => {
    render(<List />);
    const items = screen.queryAllByText('Item 3');
    expect(items).toHaveLength(0);
  });
  ```

---

### Summary of Query Methods

| Method               | Description                                      | Example Query                               |
|----------------------|--------------------------------------------------|---------------------------------------------|
| **`getBy*`**          | Throws an error if the element is not found.     | `getByText()`, `getByRole()`, `getByLabelText()` |
| **`queryBy*`**        | Returns `null` if the element is not found.      | `queryByText()`, `queryByRole()`, `queryByLabelText()` |
| **`findBy*`**         | Asynchronous query, useful for async content.   | `findByText()`, `findByRole()`              |
| **`getAllBy*`**       | Returns an array of matching elements.          | `getAllByText()`, `getAllByRole()`           |
| **`queryAllBy*`**     | Returns `null` if no matching elements are found. | `queryAllByText()`, `queryAllByRole()`      |

These queries allow you to interact with the DOM in the way a real user would, ensuring your tests are more realistic and easier to maintain.