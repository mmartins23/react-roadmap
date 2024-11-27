import React, { useState, useMemo } from 'react';

const UseMemoExample = () => {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  // Function to calculate a factorial (intentionally heavy)
  const factorial = (n) => {
    console.log("Calculating factorial...");
    if (n <= 0) return 1;
    return n * factorial(n - 1);
  };

  // Memoized value of the factorial
  const memoizedFactorial = useMemo(() => factorial(number), [number]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>useMemo Example</h1>
      <hr />

      <div>
        <label>
          Enter a number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <p>Factorial: {memoizedFactorial}</p>

      <button onClick={() => setCounter(counter + 1)} style={{ marginTop: '20px', padding: '10px' }}>
        Increment Counter: {counter}
      </button>
    </div>
  );
};

export default UseMemoExample;
