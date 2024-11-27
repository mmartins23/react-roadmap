### Explaining `useState` in React

The `useState` hook is one of the fundamental hooks in React. It is used to add state management to functional components. Before hooks were introduced, state management was limited to class components, but `useState` brought this capability to functional components.

#### Why Use `useState`?

1. **State Management**: `useState` allows functional components to maintain state, enabling dynamic and interactive user interfaces.
2. **Declarative Updates**: The state changes are declarative, meaning React re-renders the component automatically when the state updates, reflecting the changes in the UI.
3. **Simplifies Logic**: By combining `useState` with other hooks, you can handle state logic in a clean and modular way, avoiding class-based lifecycle methods.

#### Features of `useState`:

1. **Initial Value**: The `useState` hook takes an initial state value as an argument.
2. **State Array**: It returns an array with two elements:
   - The **current state value**.
   - A **function to update the state**.
3. **Immutable Updates**: State updates replace or modify the state immutably, ensuring the original state is not directly mutated.
4. **Lazy Initialization**: The initial state can be computed lazily by passing a function to `useState`.

---

### Code Explanation: `CounterApp`

```jsx
import { useState } from "react";

function CounterApp() {
    const [state, setCounter] = useState({
        counter1: 10,
        counter2: 20,
        counter3: 30
    });

    const { counter1, counter2, counter3 } = state;

    return (
        <div>
            <h1>Counter: {counter1}</h1>
            <h1>Counter: {counter2}</h1>
            <h1>Counter: {counter3}</h1>

            <hr />

            <button 
                className="btn btn-danger" 
                onClick={() => setCounter({ ...state, counter1: counter1 + 1 })}
            >
                +1
            </button>
        </div>
    );
}

export default CounterApp;
```

#### Key Points:

1. **State Object**: 
   - The state is initialized with an object containing three counters: `counter1`, `counter2`, and `counter3`.
   - Using objects allows grouping related values into a single state variable.

2. **Destructuring**:
   - The counters (`counter1`, `counter2`, `counter3`) are destructured from the `state` object for cleaner access.

3. **Updating State**:
   - The `setCounter` function is used to update `counter1`.
   - The spread operator (`...state`) ensures that the other counters remain unchanged, maintaining immutability.

---

### Code Explanation: `CounterWithCustomHook`

```jsx
import useCounter from "../../hooks/useCounter";

function CounterWithCustomHook() {
    const { counter, increment, decrement, reset } = useCounter();

    return (
        <>
            <h1>Counter with Hook: {counter}</h1>
            <hr />

            <button className="btn btn-primary" onClick={() => increment(2)}>+</button>
            <button className="btn btn-primary" onClick={reset}>Reset</button>
            <button className="btn btn-primary" onClick={() => decrement(2)}>-</button>
        </>
    );
}

export default CounterWithCustomHook;
```

#### Key Points:

1. **Custom Hook**:
   - A reusable custom hook `useCounter` is created to encapsulate counter logic.

2. **Cleaner Logic**:
   - `increment`, `decrement`, and `reset` are exposed by the hook, abstracting the internal state management.

3. **Modular Design**:
   - The custom hook can be reused across components, making the code more modular and maintainable.

---

### Code Explanation: `useCounter` Hook

```jsx
import { useState } from "react";

function useCounter(initialValue = 0) {
    const [counter, setCounter] = useState(initialValue);

    const increment = (value) => {
        setCounter(prevCounter => prevCounter + value);
    };

    const decrement = (value) => {
        if (counter === 0) return;
        setCounter(prevCounter => prevCounter - value);
    };

    const reset = () => {
        setCounter(initialValue);
    };

    return {
        counter,
        increment,
        decrement,
        reset
    };
}

export default useCounter;
```

#### Key Points:

1. **Encapsulation**:
   - The `useCounter` hook encapsulates all counter-related logic in one place.

2. **Parameterization**:
   - It accepts an `initialValue`, making it flexible for different starting values.

3. **State Updates**:
   - The `increment` and `decrement` functions update the counter by modifying the current state immutably.
   - `prevCounter` ensures state updates are based on the latest state value.

4. **Reset Logic**:
   - The `reset` function reverts the counter to its initial value.

---

### Advantages of Custom Hooks

1. **Reusability**:
   - Logic like `useCounter` can be reused across multiple components, reducing redundancy.

2. **Separation of Concerns**:
   - By separating state logic into hooks, component code becomes cleaner and easier to manage.

3. **Testability**:
   - Custom hooks are easier to test in isolation, ensuring better code quality.

---