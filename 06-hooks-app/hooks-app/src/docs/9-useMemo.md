### **Understanding `useMemo` Hook**

`useMemo` is a React hook used for performance optimization. It memoizes a **computed value**, ensuring it is recomputed only when its dependencies change. This can be helpful to avoid expensive recalculations or rendering logic in components.

---

### **Key Features of `useMemo`**
1. **Memoization of Expensive Calculations:**
   - Stores the result of a computation and reuses it until dependencies change.

2. **Avoids Unnecessary Calculations:**
   - Useful in cases where recalculating a value is expensive and dependencies rarely change.

3. **Controlled Dependencies:**
   - Only recalculates when one of the specified dependencies changes.

4. **Improves Performance:**
   - Especially useful in components with heavy computation or large datasets.

---

### **Syntax**
```javascript
const memoizedValue = useMemo(() => computeFunction(), [dependencies]);
```
- **`computeFunction`**: A function that performs the expensive computation.
- **`dependencies`**: An array of variables the computation depends on. If these values change, the computation is re-executed.

---

### **Code Example: Optimizing a Filtered List**

#### **Without `useMemo`**
In the following example, the `filterExpensiveItems` function runs on every render, even if its dependencies haven't changed:

```javascript
const ExpensiveCalculationComponent = ({ items, searchQuery }) => {
  const filteredItems = items.filter(item => item.includes(searchQuery)); // Runs on every render

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
```

---

#### **With `useMemo`**

Using `useMemo`, we optimize the filtering logic to recalculate only when `items` or `searchQuery` changes:

```javascript
import React, { useMemo, useState } from 'react';

const ExpensiveCalculationComponent = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the filtered list
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, searchQuery]); // Recompute only when `items` or `searchQuery` changes

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search items"
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensiveCalculationComponent;
```

---

### **How It Works**
1. **Recalculation Trigger:**
   - The `filter` operation will only re-run when either `items` or `searchQuery` changes.
   - This avoids redundant filtering when other unrelated state changes occur.

2. **Efficiency:**
   - For large datasets, this can drastically improve performance by reducing unnecessary computations.

---

### **Example Explanation**
1. **State Management:**
   - `searchQuery` is managed with `useState` and updated when the user types into the input field.

2. **Memoization with `useMemo`:**
   - `useMemo` ensures the filtering logic is not repeated unnecessarily.

3. **Dependency Array:**
   - `items` and `searchQuery` are dependencies. If these values don’t change, `useMemo` returns the previously computed value.

---

### **When to Use `useMemo`**
1. **Expensive Computations:**
   - Sorting, filtering, or other intensive operations on large datasets.

2. **Derived State:**
   - When a derived value depends on multiple props or states and is costly to calculate.

3. **Preventing Child Component Re-renders:**
   - Avoiding recalculations that might unnecessarily trigger child renders.

---

### **Common Mistakes**
1. **Overuse:**
   - Using `useMemo` unnecessarily can complicate code without noticeable performance benefits.

2. **Incorrect Dependencies:**
   - Failing to include all necessary dependencies can lead to stale or incorrect results.

---

### **Real-World Example: Calculating Factorial**
```javascript
import React, { useState, useMemo } from 'react';

const FactorialCalculator = () => {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState('light');

  // Memoize factorial calculation
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    const calculateFactorial = n => (n <= 1 ? 1 : n * calculateFactorial(n - 1));
    return calculateFactorial(number);
  }, [number]);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>Factorial Calculator</h1>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(Number(e.target.value))}
        min="0"
      />
      <p>Factorial: {factorial}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};

export default FactorialCalculator;
```

---

### **Explanation**
1. **`useMemo` for Factorial:**
   - The factorial calculation is expensive and memoized. It only recalculates when `number` changes.
   - Changing the theme does not trigger recalculation of the factorial.

2. **Theme Update:**
   - The `theme` state changes the component's appearance without affecting the factorial computation.

---

Let me know if you need further clarification or more examples!