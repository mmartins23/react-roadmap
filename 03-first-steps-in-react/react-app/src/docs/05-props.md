### What Are Props in React?

**Props** (short for "properties") are a mechanism in React used to pass data from one component to another. They allow you to make components dynamic and reusable by giving them different inputs.

---

### Key Features of Props

1. **Read-Only**:
   - Props are immutable. Once passed to a component, they cannot be modified by that component.
   
2. **Passed from Parent to Child**:
   - Data flows **one way**: from a parent component to a child component.
   
3. **Dynamic Content**:
   - Props enable components to receive dynamic data, making them more versatile.

---

### How to Use Props in React

#### 1. Passing Props from Parent to Child
Props are passed to a child component as attributes.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Welcome name="Josefina" />;
}

export default App;
```

In this example:
- `App` passes the `name` prop to the `Welcome` component.
- The `Welcome` component accesses the `name` prop and displays "Hello, Josefina!".

---

#### 2. Destructuring Props
You can destructure props directly in the function signature for cleaner code.

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Welcome name="Josefina" />;
}
```

---

#### 3. Passing Multiple Props
You can pass multiple props to a component.

```jsx
function UserInfo({ name, age }) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
}

function App() {
  return <UserInfo name="Josefina" age={25} />;
}
```

---

#### 4. Passing Props with Dynamic Data
Props can also pass dynamic data like variables, state, or even functions.

```jsx
function Button({ handleClick, label }) {
  return <button onClick={handleClick}>{label}</button>;
}

function App() {
  const handleClick = () => alert('Button clicked!');

  return <Button handleClick={handleClick} label="Click Me" />;
}
```

---

#### 5. Default Props
You can specify default values for props in case they are not provided.

```jsx
function Welcome({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Welcome />; // Outputs: Hello, Guest!
}
```

Alternatively, use `defaultProps`:
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

Welcome.defaultProps = {
  name: "Guest",
};
```

---

### Benefits of Using Props

1. **Reusable Components**:
   - Components can be reused with different data.

2. **Dynamic UI**:
   - Allows building dynamic and data-driven applications.

3. **Data Flow**:
   - Helps maintain a clear, predictable data flow from parent to child.

---

### Summary

Props are a fundamental part of React for passing data between components. They make components dynamic, reusable, and easy to maintain. Since props are immutable, they ensure a unidirectional data flow, promoting a clean and predictable component structure.