### What is `useEffect` in React?

The `useEffect` hook is a React Hook that lets you perform side effects in function components. Side effects include operations like fetching data, manipulating the DOM, subscribing to events, or logging.

#### Syntax

```javascript
useEffect(effect: () => void | (() => void), deps?: Array<any>);
```

- **effect:** A function containing the logic for the side effect.
- **deps (optional):** An array of dependencies that determine when the effect should re-run. If omitted, the effect runs after every render.

---

### Basic Usage

#### Example 1: Logging to the console

```javascript
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Effect runs after every render
  useEffect(() => {
    console.log(`You clicked ${count} times`);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

- Every time the `count` changes, the effect runs.

---

### Using Dependencies

#### Example 2: Run effect only on specific changes

```javascript
useEffect(() => {
  console.log("Count updated:", count);
}, [count]); // Effect runs only when `count` changes
```

If the dependency array (`[count]`) is empty (`[]`), the effect runs only once, after the component mounts.

---

### Cleanup Function

For effects that require cleanup (e.g., subscriptions, timers), `useEffect` can return a cleanup function.

#### Example 3: Cleanup with a Timer

```javascript
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it runs only once

  return <div>Elapsed Time: {seconds}s</div>;
}

export default Timer;
```

- **Why cleanup?** Without it, the interval would keep running even after the component is unmounted, causing memory leaks.

---

### Fetching Data with `useEffect`

#### Example 4: Fetch Data from an API

```javascript
import React, { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, []); // Run only once after the component mounts

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
```

- The empty dependency array ensures that data is fetched only once when the component mounts.

---

### Combining Multiple `useEffect` Hooks

You can use multiple `useEffect` hooks in a component to separate different side effects.

#### Example 5: Separate Effects for Different Tasks

```javascript
useEffect(() => {
  console.log("Component mounted");
}, []); // Runs once

useEffect(() => {
  console.log("Count updated:", count);
}, [count]); // Runs when `count` changes

useEffect(() => {
  console.log("Name updated:", name);
}, [name]); // Runs when `name` changes
```

---

### Common Mistakes

1. **Not specifying dependencies:**
   - Without a dependency array, the effect runs after every render, which can cause performance issues.

   ```javascript
   useEffect(() => {
     console.log("This runs after every render");
   });
   ```

2. **Incorrect dependencies:**
   - Forgetting to include variables in the dependency array can lead to stale or incorrect data.

   ```javascript
   useEffect(() => {
     console.log(`Name is: ${name}`);
   }, []); // This won't update when `name` changes
   ```

3. **Overusing `useEffect`:**
   - Avoid using `useEffect` for logic that can run directly inside the component.

---

### Advanced Example: Synchronizing with Props or Context

```javascript
import React, { useState, useEffect } from "react";

function SyncWithProps({ someProp }) {
  const [data, setData] = useState(someProp);

  useEffect(() => {
    setData(someProp);
  }, [someProp]); // Syncs `data` with `someProp` changes

  return <div>Data: {data}</div>;
}

export default SyncWithProps;
```

---

### Summary

- `useEffect` is powerful for handling side effects like data fetching, subscriptions, and manual DOM manipulations.
- Use the dependency array to control when the effect runs.
- Always clean up resources in effects to avoid memory leaks.