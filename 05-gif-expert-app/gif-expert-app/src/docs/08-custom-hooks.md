### What Are Custom Hooks in React?

A **custom hook** is a reusable JavaScript function in React that allows you to encapsulate logic and share it across components. Custom hooks use the same hooks (e.g., `useState`, `useEffect`) provided by React, but they enable modular, reusable, and clean code for managing stateful logic.

**Key Benefits of Custom Hooks:**
1. **Reusability**: Logic can be shared across multiple components.
2. **Abstraction**: Separate complex logic from components, making them cleaner and more readable.
3. **Testability**: Custom hooks can be tested independently.

---

### Rules for Custom Hooks:
1. Custom hooks **must start with "use"** (e.g., `useFetch`, `useToggle`).
2. They can use other hooks like `useState`, `useEffect`, `useReducer`, etc.
3. Custom hooks are functions, not components.

---

### Example 1: A Custom Hook for Fetching Data (`useFetch`)

#### Custom Hook: `useFetch`

```javascript
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json); // Update the data state
            } catch (err) {
                setError(err.message); // Update the error state
            } finally {
                setIsLoading(false); // Stop the loading indicator
            }
        };

        fetchData();
    }, [url]); // Fetch new data when the URL changes

    return { data, isLoading, error };
};
```

---

#### Using the `useFetch` Hook in a Component:

```javascript
import React from 'react';
import { useFetch } from './hooks/useFetch';

const Posts = () => {
    const { data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {data.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default Posts;
```

---

### Example 2: A Custom Hook for Managing a Toggle State (`useToggle`)

#### Custom Hook: `useToggle`

```javascript
import { useState } from 'react';

export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => {
        setValue((prevValue) => !prevValue); // Toggle the state
    };

    return [value, toggle];
};
```

---

#### Using the `useToggle` Hook in a Component:

```javascript
import React from 'react';
import { useToggle } from './hooks/useToggle';

const ToggleButton = () => {
    const [isToggled, toggle] = useToggle(false);

    return (
        <div>
            <p>The button is {isToggled ? 'ON' : 'OFF'}</p>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
};

export default ToggleButton;
```

---

### Example 3: A Custom Hook for Form Handling (`useForm`)

#### Custom Hook: `useForm`

```javascript
import { useState } from 'react';

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const reset = () => setValues(initialValues);

    return { values, handleChange, reset };
};
```

---

#### Using the `useForm` Hook in a Component:

```javascript
import React from 'react';
import { useForm } from './hooks/useForm';

const SignUpForm = () => {
    const { values, handleChange, reset } = useForm({ username: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', values);
        reset(); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignUpForm;
```

---

### Best Practices for Custom Hooks:

1. **Encapsulation**: Encapsulate a single piece of logic in one hook.
   - Example: `useFetch` for data fetching, `useToggle` for toggle state.
2. **Composition**: Combine custom hooks to build more complex behavior.
3. **Testing**: Write tests for custom hooks to ensure their reliability.
4. **Reusability**: Abstract logic that is used in multiple components into a custom hook.
5. **Dependencies**: Ensure the dependency array in `useEffect` is properly managed to avoid stale state or infinite loops.

---

### Custom Hooks Summary:

Custom hooks allow you to:
- Reuse and abstract complex logic.
- Keep components focused on UI logic.
- Follow DRY (Don't Repeat Yourself) principles.
  
They are an essential tool in React development for organizing code efficiently and improving maintainability.