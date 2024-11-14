### Understanding **Props** vs **State** in React

In React, **props** and **state** are two fundamental concepts for managing data and dynamic content. While they may seem similar, they serve different purposes and are used in distinct ways.

---

### Key Differences Between Props and State

| **Feature**     | **Props**                                      | **State**                                      |
|-----------------|------------------------------------------------|------------------------------------------------|
| **Definition**   | Props (short for "properties") are used to pass data from a parent component to a child component. | State is a data structure used to manage information within a component. |
| **Mutability**   | Immutable (read-only). Cannot be modified by the child component. | Mutable (can be changed using `setState` or `useState`). |
| **Scope**        | Passed from parent to child components.        | Managed locally within the component.          |
| **Responsibility**| Controlled by the parent component.           | Controlled by the component itself.            |
| **Usage**        | For configuring or customizing child components. | For managing data that changes over time within a component. |
| **Triggers Re-render?** | Yes, when the parent component re-renders and passes new props. | Yes, when state is updated using `setState` or `useState`. |

---

### Example 1: Using **Props** for Data Passing

Props allow a parent component to pass data to a child component.

```jsx
// Parent Component
import React from 'react';
import Greeting from './Greeting';

function App() {
  return <Greeting name="Alice" />;
}

export default App;

// Child Component (Greeting.js)
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

**Explanation**:
- The `App` component passes the `name` prop to the `Greeting` component.
- The `Greeting` component uses `props.name` to display "Hello, Alice!".

---

### Example 2: Using **State** for Managing Internal Data

State is used to manage data that can change within a component.

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Explanation**:
- **`useState(0)`** initializes the `count` state with `0`.
- The `increment` function updates the state using `setCount`.
- Every time the button is clicked, the component re-renders to show the updated count.

---

### Example 3: Combining **Props** and **State**

Props and state can work together. For example, a parent component can pass data via props, and the child component can manage its own state.

```jsx
// Parent Component
import React from 'react';
import ItemList from './ItemList';

function App() {
  const initialItems = ['Apple', 'Banana', 'Cherry'];

  return <ItemList items={initialItems} />;
}

export default App;

// Child Component (ItemList.js)
import React, { useState } from 'react';

function ItemList(props) {
  const [items, setItems] = useState(props.items);

  const addItem = () => {
    setItems([...items, `New Item ${items.length + 1}`]);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default ItemList;
```

**Explanation**:
- The parent (`App`) passes the `initialItems` array as a prop.
- The child (`ItemList`) initializes its state with the prop value using `useState`.
- The child manages its own state (`items`) and updates it when the "Add Item" button is clicked.

---

### Example 4: Parent Updating Child via Props

Props allow the parent to control the child’s behavior or appearance dynamically.

```jsx
// Parent Component
import React, { useState } from 'react';
import Status from './Status';

function App() {
  const [status, setStatus] = useState('Inactive');

  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === 'Inactive' ? 'Active' : 'Inactive'));
  };

  return (
    <div>
      <Status currentStatus={status} />
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );
}

export default App;

// Child Component (Status.js)
import React from 'react';

function Status(props) {
  return <p>Status: {props.currentStatus}</p>;
}

export default Status;
```

**Explanation**:
- The `App` component manages the `status` state.
- It passes `status` as a prop (`currentStatus`) to the `Status` component.
- Clicking the button in `App` updates the state and causes both `App` and `Status` to re-render.

---

### Key Takeaways

- **Props**:
  - Used for passing data from **parent to child**.
  - Immutable from the perspective of the child component.

- **State**:
  - Used for managing **dynamic, local data** within a component.
  - Mutable, and updating it triggers a re-render.

- **When to Use**:
  - Use **props** to configure child components or pass data.
  - Use **state** to manage data that is local to a component and changes over time.