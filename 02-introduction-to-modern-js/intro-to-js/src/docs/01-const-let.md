`let` and `const` are ways to declare variables in JavaScript. They were introduced in ES6 (ECMAScript 2015) to address some limitations of the older `var` keyword. Here's a breakdown with code examples:

**`let`**

* **Block Scope:**  Variables declared with `let` are limited to the block of code (defined by curly braces `{}`) in which they are declared. This means they are not accessible outside that block, promoting better code organization and reducing potential conflicts.
* **Re-assignment:**  You can change the value of a `let` variable after it's been declared.

```javascript
function exampleLet() {
  let age = 30; 
  console.log(age); // Output: 30

  if (true) {
    let age = 40; // This creates a new 'age' variable within the block
    console.log(age); // Output: 40
  }

  console.log(age); // Output: 30 (the original 'age' remains unchanged)
}

exampleLet();
```

**`const`**

* **Block Scope:** Similar to `let`, `const` variables also have block scope.
* **Constant Value:**  The value of a `const` variable cannot be re-assigned after it's declared. This makes it ideal for values that should remain constant throughout your program.
* **Important Note:** While you can't re-assign a `const` variable to a completely new value, if it holds an object or an array, you can still modify the *properties* of that object or the *elements* of that array.

```javascript
function exampleConst() {
  const name = "Alice";
  console.log(name); // Output: Alice
  // name = "Bob"; // This would throw an error 

  const numbers = [1, 2, 3];
  console.log(numbers); // Output: [1, 2, 3]
  numbers.push(4); // This is allowed (modifying the array)
  console.log(numbers); // Output: [1, 2, 3, 4]
}

exampleConst();
```

**Key Differences and When to Use**

| Feature | `let` | `const` |
|---|---|---|
| Scope | Block scope | Block scope |
| Re-assignment | Allowed | Not allowed |
| Use Cases | Variables that may change |  Values that should remain constant (e.g., API keys, configuration settings) |

**Best Practices**

* **`const` by Default:**  It's generally recommended to use `const` as your default choice for variable declaration. This helps prevent accidental re-assignments and makes your code more predictable.
* **`let` When Necessary:** Use `let` only when you know that the value of a variable needs to be re-assigned.

By understanding the differences between `let` and `const`, you can write cleaner, more maintainable, and less error-prone JavaScript code.
