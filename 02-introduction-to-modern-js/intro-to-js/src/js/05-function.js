// Defining an arrow function to add two numbers
const add = (a, b) => {
    return a + b;
  };
  console.log(add(5, 3)); // Outputs 8
  
  // Arrow function with implicit return to square a number
  const square = (x) => x * x;
  console.log(square(4)); // Outputs 16
  
  // Arrow function with a single parameter to greet a person
  const greet = name => `Hello, ${name}!`;
  console.log(greet("Tony")); // Outputs "Hello, Tony!"
  
  // Arrow function with no parameters to say hello
  const sayHello = () => console.log("Hello!");
  sayHello(); // Outputs "Hello!"
  
  // Passing arguments to an arrow function for multiplication
  const multiply = (a, b) => a * b;
  console.log(multiply(2, 5)); // Outputs 10
  
  // Demonstrating how 'this' works in arrow functions
  const myObj = {
    name: "My Object",
    greet: function() {
      // Using an arrow function inside setTimeout
      setTimeout(() => {
        // 'this' refers to the myObj object
        console.log(`Hello from ${this.name}`); 
      }, 1000);
    }
  };
  myObj.greet(); // Outputs "Hello from My Object" after 1 second