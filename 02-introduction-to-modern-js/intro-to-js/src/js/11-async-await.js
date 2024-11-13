// Define an asynchronous function to fetch Pokémon data
async function getPokemonData() {
    try {
      // Make a fetch request to the Pokémon API for Pokémon with ID 25 (Pikachu)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
      
      // Check if the response status is not OK (status code outside the range 200-299)
      if (!response.ok) {
        // Throw an error if the network response is not successful
        throw new Error('Network response was not ok');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
  
      // Log the fetched Pokémon data to the console
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the fetch or JSON parsing
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  // Call the asynchronous function to execute it
  getPokemonData();
  