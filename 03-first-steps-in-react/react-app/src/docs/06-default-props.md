### What Are `defaultProps` in React?

In React, **`defaultProps`** is a way to specify default values for props in a component. If a parent component does not pass a value for a specific prop, the component will use the default value provided by `defaultProps`.

This ensures that your component always has a valid prop value, even if the parent forgets or intentionally omits some props.

---

### Key Points About `defaultProps`:
1. **Only for Undefined Props**:
   - `defaultProps` are used when a prop is `undefined`, not when it is explicitly passed as `null`.
   
2. **Supports Functional and Class Components**:
   - Works with both functional and class components.

3. **Helpful for Optional Props**:
   - Simplifies handling optional props by providing default behavior or values.

---

### Example Usage of `defaultProps`

#### 1. Functional Component with `defaultProps`

You can define `defaultProps` for functional components:

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// Assign default values
Greeting.defaultProps = {
  name: "Guest",
  age: 18,
};

function App() {
  return <Greeting />; // Outputs: Hello, Guest! Age: 18
}

export default App;
```

In this case, if the `App` component doesn't pass `name` or `age`, the `Greeting` component will use `"Guest"` and `18` as default values.

#### 2. Default Props with Passed Values

If props are passed, they override the defaults:

```jsx
function App() {
  return <Greeting name="Josefina" age={25} />; // Outputs: Hello, Josefina! Age: 25
}
```

---

### Handling `null` vs `undefined` in `defaultProps`

`defaultProps` only works when the prop is `undefined`. If a prop is explicitly passed as `null`, it will not use the default value.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

Greeting.defaultProps = {
  name: "Guest",
};

// In App component
<Greeting name={null} />; // Outputs: Hello, null!
<Greeting />;            // Outputs: Hello, Guest!
```

---

### Default Values with ES6 Destructuring

You can also use ES6 default values for props directly in the function signature, though this approach does not work with `null`.

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Greeting />; // Outputs: Hello, Guest!
}
```

---

### When to Use `defaultProps`
- **Optional Props**: When your component has props that may not always be provided.
- **Fall Back Values**: To ensure your component always behaves predictably.
- **Readability**: To document default values and intended behavior for other developers.

---

### Summary

`defaultProps` is a simple and effective way to define default values for props, ensuring that your components function correctly even when some props are not provided. It works seamlessly with both functional and class components and helps maintain predictable behavior in your React application.