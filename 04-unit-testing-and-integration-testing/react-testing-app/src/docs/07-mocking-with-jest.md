# Mocking with Jest

Mocking is a powerful feature in Jest that allows you to replace parts of your code with mock implementations. This is useful for isolating the unit under test, controlling its behavior, and testing edge cases without relying on external dependencies like APIs, databases, or modules.

### Why Mock?
- **Isolation:** Test a component or function in isolation by replacing dependencies.
- **Predictability:** Replace unpredictable external systems (like APIs) with controlled mocks.
- **Performance:** Avoid making real network calls or expensive computations during tests.

---

### Types of Mocking in Jest

#### 1. **Manual Mocks**
You create a mock implementation for a module by placing a file with the same name under the `__mocks__` directory.

```javascript
// __mocks__/axios.js
export default {
  get: jest.fn(() => Promise.resolve({ data: { id: 1, name: 'John Doe' } })),
};
```

Using the mock:
```javascript
// userService.js
import axios from 'axios';

export async function fetchUser() {
  const response = await axios.get('/user');
  return response.data;
}

// userService.test.js
import { fetchUser } from './userService';
import axios from 'axios'; // Automatically mocks axios because of the __mocks__ folder

jest.mock('axios'); // Explicitly tell Jest to use the mock

it('fetchUser retrieves the user data', async () => {
  const user = await fetchUser();
  expect(user).toEqual({ id: 1, name: 'John Doe' });
  expect(axios.get).toHaveBeenCalledWith('/user');
});
```

---

#### 2. **Mock Functions (`jest.fn()`)**
You can create mock functions manually using `jest.fn()`.

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// math.test.js
import { add } from './math';

it('should mock the add function', () => {
  const mockAdd = jest.fn((a, b) => a * b); // Mock implementation
  expect(mockAdd(2, 3)).toBe(6);
  expect(mockAdd).toHaveBeenCalledWith(2, 3);
});
```

---

#### 3. **Mocking Modules**
You can mock an entire module using `jest.mock()`.

```javascript
// db.js
export async function saveToDatabase(data) {
  // Simulate saving to a database
  return true;
}

// userService.js
import { saveToDatabase } from './db';

export async function createUser(user) {
  await saveToDatabase(user);
  return 'User created';
}

// userService.test.js
import { createUser } from './userService';
import { saveToDatabase } from './db';

jest.mock('./db'); // Automatically replaces `saveToDatabase` with a mock function

it('should call saveToDatabase when creating a user', async () => {
  saveToDatabase.mockResolvedValueOnce(true); // Mock implementation

  const result = await createUser({ name: 'John Doe' });
  expect(result).toBe('User created');
  expect(saveToDatabase).toHaveBeenCalledWith({ name: 'John Doe' });
});
```

---

#### 4. **Mocking Timers**
Jest provides utilities to mock and control timers, such as `setTimeout` or `setInterval`.

```javascript
// timer.js
export function delayedHello(callback) {
  setTimeout(() => callback('Hello!'), 1000);
}

// timer.test.js
import { delayedHello } from './timer';

jest.useFakeTimers();

it('should call the callback after 1 second', () => {
  const callback = jest.fn();
  delayedHello(callback);

  jest.advanceTimersByTime(1000); // Fast-forward time by 1 second
  expect(callback).toHaveBeenCalledWith('Hello!');
});
```

---

#### 5. **Mocking Fetch**
When using `fetch`, you can mock it globally.

```javascript
// api.js
export async function fetchUser() {
  const response = await fetch('/user');
  return response.json();
}

// api.test.js
import { fetchUser } from './api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
  })
);

it('fetchUser retrieves the user data', async () => {
  const user = await fetchUser();
  expect(user).toEqual({ id: 1, name: 'John Doe' });
  expect(fetch).toHaveBeenCalledWith('/user');
});
```

---

### Key Jest Mocking Functions
1. **`jest.fn()`**
   - Creates a standalone mock function.
   - Useful for custom implementations or spying on calls.

2. **`jest.mock(moduleName)`**
   - Mocks an entire module automatically.
   - Can be combined with manual mocks (`__mocks__` folder).

3. **`jest.spyOn(object, methodName)`**
   - Tracks calls to an existing function without replacing its implementation.
   - Can be overridden with mock implementations.

   Example:
   ```javascript
   const obj = { add: (a, b) => a + b };
   const spy = jest.spyOn(obj, 'add').mockImplementation((a, b) => a * b);

   expect(obj.add(2, 3)).toBe(6);
   expect(spy).toHaveBeenCalledWith(2, 3);
   ```

---

### Conclusion
Mocking with Jest enables you to isolate and test specific components or functions without relying on external dependencies. It ensures your tests are predictable, fast, and focused on the functionality being tested.