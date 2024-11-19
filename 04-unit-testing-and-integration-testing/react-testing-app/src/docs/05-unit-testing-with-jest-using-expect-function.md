# Unit Testing with Jest Using expect() Function

In Jest, the `expect()` function is used to define assertions for your tests. Assertions are conditions you expect to be true about the output or behavior of your code. Paired with matchers, `expect()` helps verify if the actual result matches the expected result.

### Syntax of `expect()`:
```javascript
expect(actual).matcher(expected);
```
- `actual`: The value or expression being tested.
- `matcher`: A Jest function used to compare the actual value to the expected value (e.g., `toBe`, `toEqual`, `toHaveLength`).

### Example: Testing with `expect()`

#### Function to Test
```javascript
// utils.js
export function isEven(num) {
  return num % 2 === 0;
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

#### Jest Test File
```javascript
// utils.test.js
import { isEven, capitalize } from './utils';

describe('Utility functions', () => {
  it('should return true for even numbers', () => {
    expect(isEven(4)).toBe(true);  // Direct value comparison
  });

  it('should return false for odd numbers', () => {
    expect(isEven(3)).toBe(false); // Direct value comparison
  });

  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');  // Case-sensitive match
  });

  it('should return an empty string if input is falsy', () => {
    expect(capitalize('')).toBe('');  // Handles edge case
  });
});
```

### Common Matchers in Jest with `expect()`
1. **Basic Matchers:**
   - `toBe(value)`: Checks strict equality (`===`).
   - `toEqual(value)`: Checks deep equality (useful for objects and arrays).
   
   Example:
   ```javascript
   expect(1 + 2).toBe(3);
   expect({ name: 'Alice' }).toEqual({ name: 'Alice' });
   ```

2. **Numeric Matchers:**
   - `toBeGreaterThan(number)`
   - `toBeLessThan(number)`
   - `toBeGreaterThanOrEqual(number)`
   - `toBeLessThanOrEqual(number)`

   Example:
   ```javascript
   expect(10).toBeGreaterThan(5);
   expect(10).toBeLessThanOrEqual(20);
   ```

3. **String Matchers:**
   - `toMatch(regex)`: Checks if a string matches a regular expression.
   
   Example:
   ```javascript
   expect('Hello World').toMatch(/World/);
   ```

4. **Array and Iterable Matchers:**
   - `toContain(item)`: Checks if an array or iterable contains a specific item.
   - `toHaveLength(number)`: Checks the length of an array or string.
   
   Example:
   ```javascript
   expect([1, 2, 3]).toContain(2);
   expect('React').toHaveLength(5);
   ```

5. **Exception Testing:**
   - `toThrow(error)`: Checks if a function throws an error when called.

   Example:
   ```javascript
   function throwError() {
     throw new Error('Something went wrong!');
   }
   expect(throwError).toThrow('Something went wrong!');
   ```

### Running the Tests
1. Install Jest:
   ```bash
   npm install --save-dev jest
   ```
2. Add a test script in `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
3. Run the tests:
   ```bash
   npm test
   ```

### Sample Test Output
When all tests pass:
```
PASS  ./utils.test.js
  Utility functions
    ✓ should return true for even numbers (2 ms)
    ✓ should return false for odd numbers
    ✓ should capitalize the first letter of a string
    ✓ should return an empty string if input is falsy
```

If a test fails, Jest will display the failing test, expected and received values, and stack trace to help debug the issue.