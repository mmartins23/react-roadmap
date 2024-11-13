function exampleLet() {
    let age = 30;
    console.log(age); // Output: 30

    // eslint-disable-next-line no-constant-condition
    if (true) {
        let age = 40; // This creates a new 'age' variable within the block
        console.log(age); // Output: 40
    }

    console.log(age); // Output: 30 (the original 'age' remains unchanged)
}

exampleLet();

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