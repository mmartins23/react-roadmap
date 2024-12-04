The `useReducer` hook in React is an alternative to `useState` for managing state. It is particularly useful when:

1. **The state is complex** (e.g., objects or multiple interdependent variables).
2. **State transitions are based on actions** (e.g., adding items to a cart or toggling visibility).
3. You want to use **Redux-like logic** inside a component.

---

### **Key Concepts of `useReducer`**

#### 1. **Reducer Function**

A **pure function** that takes the current state and an action as arguments and returns a new state. The logic for state transitions is centralized in this function.

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state; // Return unchanged state for unknown actions
  }
};
```

#### 2. **Initial State**

The starting state for the reducer.

```javascript
const initialState = { count: 0 };
```

#### 3. **`useReducer` Hook**

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: Current state managed by the reducer.
- `dispatch`: Function to send actions to the reducer.

---

### **Code Example: Counter App**

Here’s a simple example using `useReducer`:

```javascript
import React, { useReducer } from 'react';

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state; // Return the current state for unknown actions
  }
};

// Initial state
const initialState = { count: 0 };

const CounterApp = () => {
  // Set up useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>useReducer Counter</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};

export default CounterApp;
```

---

### **How It Works**

1. **`reducer` Function:**
   - Contains the logic for handling `increment`, `decrement`, and `reset` actions.

2. **Initial State:**
   - `{ count: 0 }`.

3. **`dispatch` Function:**
   - Sends an action (e.g., `{ type: 'increment' }`) to the reducer.
   - Based on the `action.type`, the reducer returns the updated state.

4. **`state.count`:**
   - Reflects the current state of the counter.

---

### **Benefits of `useReducer`**

1. **Centralized State Management:**
   - Keeps all state transition logic in one place (`reducer` function).

2. **Easier to Scale:**
   - Adding new actions (e.g., "double" or "halve") requires minimal changes.

3. **Improved Readability:**
   - Actions and state transitions are explicit, making the code easier to understand.

---

### **Real-World Example: To-Do List**

Here’s a more complex example to showcase `useReducer` in action:

```javascript
import React, { useReducer } from 'react';

// Define the reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = React.useState('');

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: 'add', payload: text });
      setText('');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
```

---

### **Explanation of To-Do Example**

1. **State:** 
   - Managed as an array of objects (`[{ id, text, done }]`).

2. **Actions:**
   - `add`: Adds a new to-do item with the text provided by the user.
   - `toggle`: Toggles the `done` state of a to-do item.
   - `delete`: Removes a to-do item by its `id`.

3. **Reducer Logic:**
   - Uses array operations (`map`, `filter`) to update state immutably.

4. **Dispatching Actions:**
   - `dispatch({ type: 'add', payload: 'Learn React' })` adds a new task.
   - `dispatch({ type: 'toggle', payload: id })` toggles completion.
   - `dispatch({ type: 'delete', payload: id })` removes a task.

---