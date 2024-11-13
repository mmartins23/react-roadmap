// --- Basic destructuring ---

const avengers = ["Iron Man", "Thor", "Captain America"];

// Extracting the first three elements
const [ironMan, thor, captainAmerica] = avengers;
console.log(ironMan); // Outputs "Iron Man"
console.log(thor); // Outputs "Thor"
console.log(captainAmerica); // Outputs "Captain America"


// --- Skipping elements ---

const numbers = [1, 2, 3, 4, 5];

// Extracting the first, third, and fifth elements
const [first, , third, , fifth] = numbers;
console.log(first); // Outputs 1
console.log(third); // Outputs 3
console.log(fifth); // Outputs 5


// --- Rest operator (...) ---

const colors = ["red", "green", "blue", "yellow"];

// Extracting the first two elements and the rest
const [primary1, primary2, ...restColors] = colors;
console.log(primary1); // Outputs "red"
console.log(primary2); // Outputs "green"
console.log(restColors); // Outputs ["blue", "yellow"]


// --- Default values ---

const values = [1, 2];

// Assigning default value to the third element
const [a, b, c = 3] = values;
console.log(a); // Outputs 1
console.log(b); // Outputs 2
console.log(c); // Outputs 3 (default value)


// --- Destructuring in function parameters ---

function printCoordinates([x, y]) {
  console.log(`Coordinates: (${x}, ${y})`);
}
printCoordinates([10, 20]); // Outputs "Coordinates: (10, 20)"