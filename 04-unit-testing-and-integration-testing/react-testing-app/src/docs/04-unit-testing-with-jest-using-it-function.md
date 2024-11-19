# Unit Testing with Jest Using it() Function


Unit testing with Jest involves testing individual components or functions of your application to ensure they behave as expected. The `it()` function in Jest is an alias for `test()` and is used to define a test case. Both `it()` and `test()` serve the same purpose, so you can use either based on your preference or team conventions.

### Syntax of `it()`:
```javascript
it(description, callback)
```
- `description`: A string describing the test case.
- `callback`: A function containing the test logic.

### Example: Testing a Simple Function

#### Function to Test
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

#### Jest Test File
```javascript
// math.test.js
import { add, subtract } from './math';

describe('Math functions', () => {
  it('should correctly add two numbers', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it('should correctly subtract two numbers', () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });

  it('should handle adding negative numbers', () => {
    const result = add(-2, -3);
    expect(result).toBe(-5);
  });

  it('should handle subtracting negative numbers', () => {
    const result = subtract(-5, -3);
    expect(result).toBe(-2);
  });
});
```

### Explanation
1. **Test Setup:**
   - Import the functions to test.
   - Use `describe()` to group related tests together (optional but recommended for organization).
   
2. **Writing Tests with `it()`:**
   - Each `it()` block defines a single test case with a description and a callback function containing the test logic.
   - Use `expect()` to define assertions about the output of the function under test.

3. **Assertions:**
   - Use `toBe()` to check if the actual output matches the expected value.

### Running the Test
1. Ensure Jest is installed in your project:
   ```bash
   npm install --save-dev jest
   ```
2. Add a test script to your `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
3. Run the tests:
   ```bash
   npm test
   ```

### Output
When the tests pass, you’ll see something like this:
```
PASS  ./math.test.js
  Math functions
    ✓ should correctly add two numbers (2 ms)
    ✓ should correctly subtract two numbers
    ✓ should handle adding negative numbers
    ✓ should handle subtracting negative numbers
```

If a test fails, Jest will highlight the specific test and provide details about the failure.