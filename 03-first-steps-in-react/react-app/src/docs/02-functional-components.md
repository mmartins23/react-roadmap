### What Are Functional Components in React?

In React, **components** are reusable building blocks that help break down the user interface into smaller, manageable pieces. They define how a section of the UI should look and behave.

### Functional Components

Functional components are one of the two main types of components in React (the other being class components). They are simpler and based purely on functions.

#### Key Characteristics:
1. **Stateless or Stateful**:
   - Initially, functional components were stateless, but since the introduction of React Hooks (like `useState` and `useEffect`), they can now manage state and lifecycle.

2. **Simple to Write**:
   - They are just JavaScript functions that accept `props` as an argument and return JSX (which looks like HTML) to define the UI.

3. **Hooks Support**:
   - Functional components can use **Hooks** for state management, side effects, and more, making them just as powerful as class components.

---

### Syntax Example:

#### Basic Functional Component:
```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Josefina" />
```

#### Functional Component with Hooks:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

---

### Benefits of Functional Components:
- **Simpler and Cleaner**: Less boilerplate compared to class components.
- **Easier to Test**: Because they are just functions.
- **Performance**: Often better due to reduced overhead.
- **Hooks Enable Powerful Features**: Like managing state, side effects, and context.

