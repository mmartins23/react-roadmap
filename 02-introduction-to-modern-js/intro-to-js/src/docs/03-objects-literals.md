## Object Literals in JavaScript

Object literals provide a succinct way to create objects in JavaScript. They are composed of key-value pairs enclosed within curly braces `{}`. Let's explore them with examples:

**1. Creating Objects**

```javascript
const myCar = {
  make: "Ford",
  model: "Mustang",
  year: 1969,
  color: "red",
};
```

This code defines an object named `myCar` with properties such as `make`, `model`, `year`, and `color`, each assigned corresponding values.

**2. Accessing Properties**

You can access object properties using dot notation (`.`) or bracket notation (`[]`).

```javascript
console.log(myCar.make); // Outputs "Ford"
console.log(myCar["year"]); // Outputs 1969
```

**3. Updating Properties**

Modifying existing properties is simple:

```javascript
myCar.color = "blue"; // Changes the color to blue
myCar["year"] = 2023; // Updates the year to 2023
```

**4. Adding Properties**

New properties can be easily added to the object:

```javascript
myCar.mileage = 50000; // Adds a mileage property
```

**5. Cloning Objects**

While objects are assigned by reference, creating a copy requires a specific approach to avoid unintended modifications to the original object. Here's a common method:

* **Shallow Copy using Spread Syntax (...)**

```javascript
const anotherCar = { ...myCar };
```

This creates a new object `anotherCar` with the same properties as `myCar`. However, keep in mind that this creates a shallow copy. If your object contains nested objects, those will still refer to the same objects in memory.

**Important Considerations:**

* Keys within an object literal must be unique to prevent value overwriting.
* Objects can be nested, enabling the creation of complex data structures.

By understanding object literals, you gain a valuable tool for structuring and manipulating data in your JavaScript code.
