# Querying Asynchronous Components

Querying asynchronous components in React Testing Library (RTL) is crucial for handling scenarios where elements are not immediately available in the DOM but appear later due to asynchronous operations, such as API calls, timeouts, or delayed state updates.

In these cases, RTL provides asynchronous query methods like `findBy*` and `waitFor`, which allow you to wait for elements to appear and ensure your tests reflect the user's experience.

### Key Concepts for Querying Asynchronous Components

1. **`findBy*` Queries**
   - These queries are asynchronous and return a `Promise`. They wait for the element to appear in the DOM within a default timeout (usually 1000ms).
   - They are useful when you expect elements to load or change after some delay.

2. **`waitFor`**
   - `waitFor` is a utility function that allows you to wait for certain conditions to be met. You can use it to wait for asynchronous updates in your component.

---

### 1. **Using `findBy*` Queries**

`findBy*` queries are specifically designed for asynchronous components. They return a `Promise` and resolve when the element is found or when the query times out.

#### Example 1: `findByText`

If you're rendering a component that fetches data asynchronously (e.g., an API call), you can use `findByText` to wait for the text to appear in the DOM.

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function AsyncGreeting({ isVisible }) {
  return (
    <div>
      {isVisible ? <h1>Loading...</h1> : <h1>Hello, World!</h1>}
    </div>
  );
}

test('renders hello world after async operation', async () => {
  render(<AsyncGreeting isVisible={true} />);
  
  // Initially, we see "Loading..."
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Simulate a delay and update state to show the final message
  await waitFor(() => expect(screen.getByText('Hello, World!')).toBeInTheDocument());
});
```

#### Example 2: `findByRole`

If you're querying an element by role, you can use `findByRole` to wait for it to appear.

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function AsyncButton({ isDisabled }) {
  return <button disabled={isDisabled}>Click Me</button>;
}

test('button becomes clickable after async operation', async () => {
  render(<AsyncButton isDisabled={true} />);

  // Initially, the button is disabled
  expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();

  // Simulate async behavior and update state to make the button clickable
  await waitFor(() => expect(screen.getByRole('button', { name: /click me/i })).toBeEnabled());
});
```

---

### 2. **Using `waitFor`**

The `waitFor` function is useful when you're waiting for some condition to become true (e.g., waiting for an element to change, or a state to be updated).

#### Example: Using `waitFor` to Wait for an Element to Change

If your component involves an asynchronous update (e.g., after a button click), `waitFor` can be used to wait for the updated state in the DOM.

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function ToggleText() {
  const [visible, setVisible] = React.useState(false);
  
  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Show Text</button>
      {visible && <p>Text is now visible!</p>}
    </div>
  );
}

test('displays text after button click', async () => {
  render(<ToggleText />);
  
  fireEvent.click(screen.getByText('Show Text'));

  // Wait for the text to appear asynchronously
  await waitFor(() => expect(screen.getByText('Text is now visible!')).toBeInTheDocument());
});
```

### 3. **Handling Delays with `waitFor` and `findBy*`**

You can combine `waitFor` with `findBy*` queries to explicitly wait for asynchronous updates. This ensures that the test waits for the element to appear after any async event.

#### Example: Using `findByText` with Delay

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function FetchData() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setData('Fetched Data');
    }, 2000);
  }, []);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}

test('displays fetched data after delay', async () => {
  render(<FetchData />);
  
  // Initially, show the loading message
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for the fetched data to appear in the DOM
  await waitFor(() => expect(screen.getByText('Fetched Data')).toBeInTheDocument());
});
```

### 4. **Handling Errors in Asynchronous Tests**

When you're testing asynchronous behavior, it's important to consider handling possible errors. RTL's `findBy` queries throw errors if the element is not found within the default timeout, but you can adjust this timeout using the `timeout` option.

#### Example: Handling Timeouts in `findBy*`

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function DelayedText() {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setText('Text is loaded!'), 3000);
    return () => clearTimeout(timer);
  }, []);

  return <div>{text || 'Loading...'}</div>;
}

test('waits for text to load asynchronously', async () => {
  render(<DelayedText />);
  
  // Initially, the loading text is displayed
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the text to load after a delay
  await waitFor(() => expect(screen.getByText('Text is loaded!')).toBeInTheDocument(), { timeout: 4000 });
});
```

---

### Best Practices for Testing Asynchronous Components

1. **Prefer `findBy*` over `getBy*` for asynchronous components**: `findBy*` queries are designed to wait for elements asynchronously, while `getBy*` will throw an error if the element is not found immediately.

2. **Use `waitFor` for specific conditions**: Use `waitFor` when you need to wait for changes that may not involve a specific query, like a state change or an update to the DOM.

3. **Handle timeouts**: If your async operation might take longer than the default timeout, you can adjust the timeout in `findBy*` queries or use `waitFor` with the `{ timeout: <time> }` option.

4. **Use `await` to resolve promises**: Always use `await` with `findBy*` and `waitFor` to ensure the test waits for the async operation to complete before making assertions.

---

### Summary of Asynchronous Queries

| Query Method        | Description                                                      | Use Case                                     |
|---------------------|------------------------------------------------------------------|---------------------------------------------|
| **`findBy*`**        | Asynchronous query that returns a Promise, useful for waiting for elements to appear in the DOM. | Use when an element is expected to appear asynchronously. |
| **`waitFor`**        | Waits for a specific condition to be met (e.g., an element to appear or change). | Use when you need to wait for a condition to be true before making assertions. |

With these asynchronous queries, you can effectively test components that involve API calls, timers, or other asynchronous operations in React.