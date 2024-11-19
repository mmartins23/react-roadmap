# Testing Async Code with Jest 

Testing asynchronous code in Jest is straightforward thanks to its support for promises, async/await, and callback-based patterns. Async testing ensures that functions behave correctly when dealing with delayed operations, such as API calls or timers.

### Ways to Test Async Code with Jest

#### 1. **Using Callbacks**
Jest will wait until the callback is invoked to consider the test complete. You must include a `done` parameter in the test function.

```javascript
// async.js
export function fetchData(callback) {
  setTimeout(() => callback('Hello World'), 1000);
}

// async.test.js
import { fetchData } from './async';

it('fetchData calls the callback with "Hello World"', (done) => {
  function callback(data) {
    expect(data).toBe('Hello World');
    done(); // Marks the test as complete
  }

  fetchData(callback);
});
```

#### 2. **Using Promises**
If the function being tested returns a promise, you can test it by returning the promise from the test case.

```javascript
// async.js
export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Hello World'), 1000);
  });
}

// async.test.js
import { fetchData } from './async';

it('fetchData resolves to "Hello World"', () => {
  return fetchData().then((data) => {
    expect(data).toBe('Hello World');
  });
});
```

#### 3. **Using `async/await`**
You can write asynchronous tests using the `async` and `await` keywords for cleaner syntax.

```javascript
// async.test.js
import { fetchData } from './async';

it('fetchData resolves to "Hello World" using async/await', async () => {
  const data = await fetchData();
  expect(data).toBe('Hello World');
});
```

#### 4. **Using `.resolves` and `.rejects` Matchers**
Jest provides `resolves` and `rejects` to simplify assertions for promises.

- **Resolving Promises:**
```javascript
it('fetchData resolves to "Hello World" using resolves', () => {
  return expect(fetchData()).resolves.toBe('Hello World');
});
```

- **Rejecting Promises:**
```javascript
// async.js
export function fetchDataWithError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Fetch failed')), 1000);
  });
}

// async.test.js
import { fetchDataWithError } from './async';

it('fetchDataWithError rejects with an error', () => {
  return expect(fetchDataWithError()).rejects.toThrow('Fetch failed');
});
```

---

### Testing Real API Calls with Mocking
For testing functions that interact with external APIs, you should mock the API calls to avoid hitting the real service.

#### Example with `jest.fn()`:
```javascript
// api.js
export async function getUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const data = await response.json();
  return data;
}

// api.test.js
import { getUser } from './api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
  })
);

it('getUser fetches the user data', async () => {
  const user = await getUser();
  expect(user).toEqual({ id: 1, name: 'John Doe' });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
});
```

---

### Summary
- Use **callbacks** with `done` for functions relying on callback mechanisms.
- Use **promises** or `async/await` for cleaner and modern async testing.
- Leverage `.resolves` and `.rejects` for concise assertions with promises.
- Mock external APIs to isolate tests and improve reliability.

These techniques ensure robust testing for any asynchronous functionality in your codebase.