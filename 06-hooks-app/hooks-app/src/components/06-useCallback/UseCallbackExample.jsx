import React, { useState, useCallback } from 'react';

// Child component
const Button = React.memo(({ onClick, text }) => {
  console.log(`Rendering button: ${text}`);
  return <button onClick={onClick}>{text}</button>;
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Without useCallback: onClick will be re-created on every render
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // No dependencies, always the same function

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []); // No dependencies, always the same function

  return (
    <div style={{ padding: '20px' }}>
      <h1>useCallback Example</h1>
      <hr />

      <p>Count: {count}</p>
      <Button onClick={increment} text="Increment" />
      <Button onClick={decrement} text="Decrement" />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{ marginTop: '20px', display: 'block' }}
      />
    </div>
  );
};

export default UseCallbackExample;
