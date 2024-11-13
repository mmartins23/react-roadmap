const myCar = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
    color: "red",
};

console.log(myCar.make); // Outputs "Ford"
console.log(myCar["year"]); // Outputs 1969

myCar.color = "blue"; // Changes the color to blue
myCar["year"] = 2023; // Updates the year to 2023

myCar.mileage = 50000; // Adds a mileage property

const anotherCar = { ...myCar }; // Cloning Objects
anotherCar.year = 2024; // Updates the year to 2024
console.log(myCar, anotherCar)