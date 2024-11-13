// --- Basic destructuring ---

// Creating an object representing a superhero
const hero = {
  name: "Iron Man",
  realName: "Tony Stark",
  suit: "Mark LXXXV"
};

// Extracting name and realName
const { name, realName } = hero;
console.log(name); // Outputs "Iron Man"
console.log(realName); // Outputs "Tony Stark"


// --- Destructuring with different variable names ---

const { name: heroName, realName: identity } = hero;
console.log(heroName); // Outputs "Iron Man"
console.log(identity); // Outputs "Tony Stark"


// --- Nested object destructuring ---

const hero2 = {
  name: "Iron Man",
  realName: "Tony Stark",
  suit: {
    model: "Mark LXXXV",
    color: "Red and Gold"
  }
};

// Extracting suit details
const { suit: { model, color } } = hero2;
console.log(model); // Outputs "Mark LXXXV"
console.log(color); // Outputs "Red and Gold"


// --- Destructuring with default values ---

const { name: n, realName: rn, weapons = "Repulsors" } = hero;
console.log(n,rn)
console.log(weapons); // Outputs "Repulsors" (default value)


// --- Destructuring in function parameters ---

function greetHero({ name, realName }) {
  console.log(`Greetings, ${name} aka ${realName}!`);
}
greetHero(hero); // Outputs "Greetings, Iron Man aka Tony Stark!"