Array destructuring, similar to object destructuring, allows you to unpack values from arrays and assign them to distinct variables. It provides an elegant way to extract elements from arrays with improved readability and conciseness.

**1. Basic Destructuring**

```javascript
const avengers = ["Iron Man", "Thor", "Captain America"];

const [ironMan, thor, captainAmerica] = avengers;

console.log(ironMan); // Outputs "Iron Man"
console.log(thor); // Outputs "Thor"
console.log(captainAmerica); // Outputs "Captain America"
```

In this example, we extract the first three elements from the `avengers` array and assign them to individual variables.

**2. Skipping Elements**

You can use commas to skip elements in the array:

```javascript
const numbers = [1, 2, 3, 4, 5];

const [first, , third, , fifth] = numbers;

console.log(first); // Outputs 1
console.log(third); // Outputs 3
console.log(fifth); // Outputs 5
```

**3. Rest Operator (...)**

The rest operator (`...`) allows you to capture the remaining elements in an array:

```javascript
const colors = ["red", "green", "blue", "yellow"];

const [primary1, primary2, ...restColors] = colors;

console.log(primary1); // Outputs "red"
console.log(primary2); // Outputs "green"
console.log(restColors); // Outputs ["blue", "yellow"]
```

**4. Default Values**

You can provide default values for elements that might not exist in the array:

```javascript
const values = [1, 2];

const [a, b, c = 3] = values;

console.log(a); // Outputs 1
console.log(b); // Outputs 2
console.log(c); // Outputs 3 (default value)
```

**5. Destructuring in Function Parameters**

Array destructuring can be used directly in function parameters:

```javascript
function printCoordinates([x, y]) {
  console.log(`Coordinates: (${x}, ${y})`);
}

printCoordinates([10, 20]); // Outputs "Coordinates: (10, 20)"
```

**Benefits of Array Destructuring:**

- **Improved Readability:** Makes code cleaner and easier to understand.
- **Conciseness:** Reduces code verbosity.
- **Flexibility:** Allows for extracting specific elements and assigning them to variables with desired names.

Array destructuring is a valuable tool for writing more efficient and maintainable JavaScript code, especially when working with arrays of data.
