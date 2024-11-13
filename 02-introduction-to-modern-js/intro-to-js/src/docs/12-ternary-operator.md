The ternary operator in JavaScript provides a concise way to write conditional expressions. It's often used as a shorthand alternative to an `if...else` statement.

**Syntax**

```
condition ? expression1 : expression2
```

* **`condition`:**  An expression that evaluates to either true or false.
* **`expression1`:**  The expression executed if the condition is true.
* **`expression2`:** The expression executed if the condition is false.

**Examples**

1. **Checking Age:**

```javascript
const age = 20;
const message = age >= 18 ? "You can vote!" : "You cannot vote yet.";
console.log(message); // Outputs "You can vote!"
```

This code checks if the `age` is greater than or equal to 18. If true, `message` is assigned "You can vote!"; otherwise, it's assigned "You cannot vote yet."

2. **Determining Theme:**

```javascript
const isDarkMode = true;
const theme = isDarkMode ? "dark" : "light";
console.log(`Applying ${theme} theme.`); // Outputs "Applying dark theme."
```

This example sets the `theme` variable based on the `isDarkMode` boolean value.

3. **Assigning a Value:**

```javascript
let score = 50;
const bonus = score > 100 ? 10 : 0;
score += bonus; 
console.log(score); // Outputs 50 (since bonus is 0)
```

Here, the `bonus` is assigned 10 only if the `score` exceeds 100.

4. **Nested Ternary Operators (Use with Caution):**

```javascript
const grade = 85;
const result = grade >= 90 ? "Excellent" : grade >= 70 ? "Good" : "Needs Improvement";
console.log(result); // Outputs "Good"
```

While you can nest ternary operators, it can sometimes make code less readable. Use them judiciously.

**Benefits of Ternary Operator**

* **Conciseness:**  Reduces code verbosity compared to `if...else` for simple conditions.
* **Readability:** Can improve readability when used appropriately.
* **Flexibility:**  Can be used within larger expressions or assignments.

The ternary operator is a valuable tool for expressing conditional logic in a concise and efficient manner in JavaScript.
