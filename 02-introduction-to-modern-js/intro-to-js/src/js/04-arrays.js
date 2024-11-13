// Creating an array of Avengers using an array literal
const avengers = ["Iron Man", "Thor", "Captain America", "Hulk"];

// Accessing the first element of the array (index 0)
console.log(avengers[0]); // Outputs "Iron Man"

// Adding "Black Widow" to the end of the array
avengers.push("Black Widow");

// Removing the last element from the array ("Black Widow")
avengers.pop();

// Removing "Thor" from the array (index 1)
avengers.splice(1, 1); 

// Iterating through the array using a for loop
for (let i = 0; i < avengers.length; i++) {
  console.log(avengers[i]); 
}

// Iterating through the array using forEach method
avengers.forEach((hero) => console.log(hero));

// Creating a new array with each name capitalized using map()
const capitalizedAvengers = avengers.map((hero) => hero.toUpperCase()); 
console.log(capitalizedAvengers);

// Creating a copy of the avengers array using the spread syntax
const avengersCopy = [...avengers]; 
console.log(avengersCopy);