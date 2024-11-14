### Understanding Conditional Rendering in React

**Conditional rendering** in React allows components to render different content or elements based on a condition, similar to how conditional statements (`if`, `else`) work in JavaScript.

---

### Common Ways to Implement Conditional Rendering

1. **Using `if-else` Statements**  
2. **Using Ternary Operators**  
3. **Using Logical `&&` Operator**  
4. **Using `switch` Statements**  
5. **Using `null` for Conditional Rendering**

---

### 1. **Using `if-else` Statements**

In this approach, the condition is handled inside the component before rendering the JSX.

#### Example: Rendering Based on User Login Status

```jsx
function UserGreeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back, User!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}

function App() {
  const isLoggedIn = true; // Change to false to test both cases
  return <UserGreeting isLoggedIn={isLoggedIn} />;
}

export default App;
```

**Explanation**:
- Depending on the value of `isLoggedIn`, the `UserGreeting` component renders different content.

---

### 2. **Using Ternary Operators**

This method is concise and often used directly within JSX.

#### Example: Displaying a Button Based on Login State

```jsx
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}

export default App;
```

**Explanation**:
- The ternary operator checks the `isLoggedIn` value.
- Depending on the condition, either the "Login" or "Logout" button is displayed.

---

### 3. **Using Logical `&&` Operator**

This method renders a component only if a condition is true. It’s useful when there’s no `else` case.

#### Example: Rendering Content Conditionally

```jsx
function App() {
  const hasNotifications = true;

  return (
    <div>
      <h1>Welcome!</h1>
      {hasNotifications && <p>You have new notifications.</p>}
    </div>
  );
}

export default App;
```

**Explanation**:
- If `hasNotifications` is `true`, the paragraph (`<p>`) is rendered.
- If `false`, React skips rendering the paragraph.

---

### 4. **Using `switch` Statements**

Use this for multiple conditions that result in different renderings.

#### Example: Rendering Based on User Role

```jsx
function UserRole({ role }) {
  switch (role) {
    case 'admin':
      return <h1>Welcome, Admin!</h1>;
    case 'editor':
      return <h1>Welcome, Editor!</h1>;
    case 'viewer':
      return <h1>Welcome, Viewer!</h1>;
    default:
      return <h1>Welcome, Guest!</h1>;
  }
}

function App() {
  return <UserRole role="editor" />;
}

export default App;
```

**Explanation**:
- The `switch` statement renders different greetings based on the `role` prop passed to `UserRole`.

---

### 5. **Using `null` to Render Nothing**

If you want to conditionally render nothing, return `null`.

#### Example: Hide an Element Conditionally

```jsx
function WarningBanner({ showWarning }) {
  if (!showWarning) {
    return null;
  }

  return <div className="warning">Warning: Something went wrong!</div>;
}

function App() {
  const [showWarning, setShowWarning] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShowWarning((prev) => !prev)}>
        {showWarning ? 'Hide Warning' : 'Show Warning'}
      </button>
      <WarningBanner showWarning={showWarning} />
    </div>
  );
}

export default App;
```

**Explanation**:
- When `showWarning` is `false`, the `WarningBanner` component returns `null` and nothing is rendered.

---

### Example: Combining Multiple Techniques

```jsx
function Dashboard({ user }) {
  if (!user) {
    return <h1>Please log in to access the dashboard.</h1>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {user.isAdmin && <p>You have admin privileges.</p>}
      {user.notifications.length > 0 ? (
        <p>You have {user.notifications.length} new notifications.</p>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
}

function App() {
  const user = {
    name: 'Alice',
    isAdmin: true,
    notifications: ['Message 1', 'Message 2'],
  };

  return <Dashboard user={user} />;
}

export default App;
```

**Explanation**:
- The `Dashboard` component demonstrates:
  - `if` to check if the user is logged in.
  - Logical `&&` for rendering admin-specific content.
  - Ternary operator for rendering notifications.

---

### Summary

- **Props and State** are often used in combination with conditional rendering.
- Use different techniques based on complexity:
  - `if-else` for simple conditions.
  - Ternary and `&&` for inline conditions.
  - `switch` for multiple conditions.
  - Return `null` to avoid rendering.
