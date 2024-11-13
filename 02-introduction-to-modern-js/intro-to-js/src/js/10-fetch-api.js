// Defines an asynchronous function called getUserData
async function getUserData() {
    try {
      // Fetches data from the specified URL (using the JSONPlaceholder API)
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  
      // Checks if the response status code indicates success (e.g., 200 OK)
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error('Network response was not ok');
      }
  
      // Parses the response body as JSON data
      const data = await response.json();
  
      // Logs the fetched user data to the console
      console.log(data); 
  
    } catch (error) {
      // Catches any errors that occurred during the fetch operation
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  // Calls the getUserData function to initiate the fetch request
  getUserData();