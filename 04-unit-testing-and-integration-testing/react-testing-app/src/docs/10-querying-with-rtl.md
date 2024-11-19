# Querying with RTL

Querying with **React Testing Library (RTL)** is the process of selecting elements from the rendered DOM during testing. It focuses on testing components as users would interact with them, emphasizing accessibility and semantic HTML.

### Key Query Methods in RTL

React Testing Library provides several query methods to locate elements. These can be grouped into three categories:

1. **`getBy...` Queries**
   - Use when the element must be present.
   - Throws an error if no matching element is found.

2. **`queryBy...` Queries**
   - Use to assert that an element does **not** exist.
   - Returns `null` if no matching element is found.

3. **`findBy...` Queries**
   - Asynchronous, for elements that may appear after some delay (e.g., data fetching).
   - Returns a promise that resolves to the element or rejects if the element isn't found.

---

### Common Query Types

#### 1. **Role-based Queries**
- Accessible and semantic.
- Prefer `getByRole` when possible, as it mirrors user interactions.

```javascript
getByRole(role, options?)
queryByRole(role, options?)
findByRole(role, options?)
```

#### 2. **Text-based Queries**
- Look for elements containing specific text.

```javascript
getByText(text, options?)
queryByText(text, options?)
findByText(text, options?)
```

#### 3. **Label-based Queries**
- Match form elements using their associated labels.

```javascript
getByLabelText(text, options?)
queryByLabelText(text, options?)
findByLabelText(text, options?)
```

#### 4. **Placeholder-based Queries**
- Target inputs using the `placeholder` attribute.

```javascript
getByPlaceholderText(placeholder, options?)
queryByPlaceholderText(placeholder, options?)
findByPlaceholderText(placeholder, options?)
```

#### 5. **Alt Text Queries**
- Find elements with an `alt` attribute, commonly for images.

```javascript
getByAltText(alt, options?)
queryByAltText(alt, options?)
findByAltText(alt, options?)
```

#### 6. **TestId Queries**
- For elements with a `data-testid` attribute. Use sparingly when no semantic alternatives exist.

```javascript
getByTestId(testId, options?)
queryByTestId(testId, options?)
findByTestId(testId, options?)
```

---

### Examples of Querying with RTL

#### 1. Query by Role

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Button() {
  return <button>Click Me</button>;
}

test("finds button by role", () => {
  render(<Button />);
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toBeInTheDocument();
});
```

#### 2. Query by Text

```javascript
test("finds element by text", () => {
  render(<p>Hello, World!</p>);
  const paragraph = screen.getByText("Hello, World!");
  expect(paragraph).toBeInTheDocument();
});
```

#### 3. Query by Label

```javascript
test("finds input by label text", () => {
  render(
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" />
    </form>
  );
  const input = screen.getByLabelText("Username");
  expect(input).toBeInTheDocument();
});
```

#### 4. Query by Placeholder Text

```javascript
test("finds input by placeholder text", () => {
  render(<input placeholder="Enter your name" />);
  const input = screen.getByPlaceholderText("Enter your name");
  expect(input).toBeInTheDocument();
});
```

#### 5. Query by Alt Text

```javascript
test("finds image by alt text", () => {
  render(<img src="logo.png" alt="Company Logo" />);
  const image = screen.getByAltText("Company Logo");
  expect(image).toBeInTheDocument();
});
```

#### 6. Query by TestId

```javascript
test("finds element by test ID", () => {
  render(<div data-testid="custom-element">Hello</div>);
  const element = screen.getByTestId("custom-element");
  expect(element).toBeInTheDocument();
});
```

---

### Advanced Queries with Options

#### Custom Matching
You can use a callback function for custom matching:

```javascript
const element = screen.getByRole("heading", (content, element) =>
  element.tagName.toLowerCase() === "h1"
);
```

#### Regular Expressions
Match text with regex:

```javascript
screen.getByText(/hello/i); // Case-insensitive match
screen.getByText(/^Hello$/); // Exact match
```

#### Combining Options
Use `name`, `hidden`, or `level` options for fine-grained control:

```javascript
screen.getByRole("button", { name: /submit/i, hidden: true });
```

---

### Asynchronous Queries

#### Example with `findBy...`

```javascript
import { render, screen } from "@testing-library/react";

test("finds element after data fetching", async () => {
  render(<div>{/* Simulated fetch result */}</div>);
  // Wait for the element to appear
  const element = await screen.findByText(/fetched data/i);
  expect(element).toBeInTheDocument();
});
```

---

### Best Practices

1. **Prioritize Accessibility:**
   - Prefer queries like `getByRole` and `getByLabelText`.

2. **Avoid Overusing Test IDs:**
   - Use `data-testid` only as a last resort.

3. **Be Explicit:**
   - Include options for better readability and maintainability.

4. **Use `findBy...` for Async Tests:**
   - Avoid `waitFor` unless you need to wait for multiple assertions.

By following these practices, querying with RTL can help you write robust and user-centric tests!