Test-Driven Development (TDD) is a software development approach where you write tests before writing the actual code. It follows a three-step cycle often referred to as **Red-Green-Refactor**:

1. **Red**: Write a failing test based on the requirements or expected behavior.
2. **Green**: Write the minimal code necessary to make the test pass.
3. **Refactor**: Refactor the code to improve structure, readability, or efficiency, without changing its behavior.

Let's go through a TDD example with a simple Counter component in React.

### Step 1: Writing the Failing Test (Red)

We want to create a `Counter` component with the following requirements:
- Displays an initial count.
- Has an "Increment" button to increase the count.
- Has a "Decrement" button to decrease the count.

First, we write tests for these requirements before writing the actual component code.

#### Counter.test.jsx

```javascript
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter Component", () => {
    test("renders the initial count", () => {
        render(<Counter initialCount={0} />);
        const countElement = screen.getByText("0");
        expect(countElement).toBeInTheDocument();
    });

    test("increments the count when the Increment button is clicked", async () => {
        render(<Counter initialCount={0} />);
        const incrementButton = screen.getByRole("button", { name: /Increment/i });
        
        await user.click(incrementButton);
        const countElement = screen.getByText("1");
        
        expect(countElement).toBeInTheDocument();
    });

    test("decrements the count when the Decrement button is clicked", async () => {
        render(<Counter initialCount={0} />);
        const decrementButton = screen.getByRole("button", { name: /Decrement/i });
        
        await user.click(decrementButton);
        const countElement = screen.getByText("-1");
        
        expect(countElement).toBeInTheDocument();
    });
});
```

Here’s what each test does:
- The first test checks if the initial count is displayed.
- The second test checks if clicking "Increment" increases the count by 1.
- The third test checks if clicking "Decrement" decreases the count by 1.

Running these tests now will result in failures because we haven't implemented the `Counter` component yet.

### Step 2: Write the Minimal Code to Pass the Test (Green)

Now, let’s create the `Counter` component to satisfy these tests.

#### Counter.jsx

```javascript
import { useState } from "react";
import PropTypes from "prop-types";

function Counter({ initialCount }) {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

Counter.propTypes = {
    initialCount: PropTypes.number.isRequired,
};

export default Counter;
```

The component does the following:
- Initializes the count with the `initialCount` prop.
- Displays the count in an `<h2>` element.
- Provides two buttons, "Increment" and "Decrement," that modify the count accordingly.

When you run the tests again, they should now pass.

### Step 3: Refactor

With the tests passing, we can now refactor the code to improve readability or maintainability, if needed. In this case, the code is already straightforward, so we might not need additional changes. However, if you wanted to add more logic or additional props, you could do so confidently because your tests would validate that everything still works as expected.

### Final Thoughts

TDD is a powerful way to ensure that your code is robust, as the tests drive the implementation and capture the requirements. You can keep iterating through the Red-Green-Refactor cycle as you add new features or modify the component.