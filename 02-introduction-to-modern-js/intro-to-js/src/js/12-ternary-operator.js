// Defines a function called checkGrade that takes a grade as an argument
const checkGrade = (grade) => {
    // Uses the ternary operator to check if the grade is greater than or equal to 65
    // If true, it returns 'Passed', otherwise it returns 'Failed'
    return grade >= 65 ? 'Passed' : 'Failed';
  }
  
  // Calls the checkGrade function with a grade of 64 and logs the result (should be 'Failed')
  console.log(checkGrade(64)); 
  
  // Calls the checkGrade function with a grade of 80 and logs the result (should be 'Passed')
  console.log(checkGrade(80));