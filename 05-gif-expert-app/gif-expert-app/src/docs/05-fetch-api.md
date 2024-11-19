The `fetch` API is a modern way to make HTTP requests in JavaScript, allowing you to interact with remote resources like APIs to retrieve data. It is built into JavaScript and returns a promise that resolves with the `Response` object representing the response to the request.

In the provided code, `fetch` is used to retrieve data from the Giphy API to search for GIFs based on a specific category.

### Explanation of `getGifs` Function:

```javascript
export const getGifs = async (category) => {
    // Construct the URL with the category passed as a parameter
    const url = `https://api.giphy.com/v1/gifs/search?api_key=84i1PGrZ4pOzjgtV6jO3pDRT9PQ0VmTl&q=${category}&limit=10`;
    
    // Fetch data from the Giphy API using the constructed URL
    const res = await fetch(url);

    // Convert the response into JSON format
    const { data } = await res.json();

    // Map the JSON data into a more usable format
    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url // URL of the GIF image
    }));

    // Return the list of GIFs
    return gifs;
}
```

### Breakdown:

1. **URL Construction**:
   ```javascript
   const url = `https://api.giphy.com/v1/gifs/search?api_key=84i1PGrZ4pOzjgtV6jO3pDRT9PQ0VmTl&q=${category}&limit=10`;
   ```
   The URL is constructed dynamically by embedding the `category` passed to the `getGifs` function into the query string. It uses the Giphy API endpoint for searching GIFs. The query parameters are:
   - `api_key`: A unique key required for accessing the API.
   - `q`: The search query (category of GIFs).
   - `limit`: The number of GIFs to fetch (in this case, 10).

2. **Making the Request**:
   ```javascript
   const res = await fetch(url);
   ```
   The `fetch` function is called with the constructed `url`. This initiates an HTTP GET request to the Giphy API. The `await` keyword ensures that the JavaScript code waits for the response before proceeding.

3. **Handling the Response**:
   ```javascript
   const { data } = await res.json();
   ```
   The `res.json()` method is called to parse the response body as JSON. The `await` keyword ensures that it waits until the JSON data is fully parsed before moving forward. The destructuring assignment `{ data }` extracts the `data` property from the JSON response, which contains an array of GIF objects.

4. **Mapping the GIF Data**:
   ```javascript
   const gifs = data.map(img => ({
       id: img.id,
       title: img.title,
       url: img.images.downsized_medium.url
   }));
   ```
   The `data.map()` function iterates over each GIF object in the `data` array, and for each `img`, it extracts and returns an object with the following properties:
   - `id`: The unique ID of the GIF.
   - `title`: The title of the GIF.
   - `url`: The URL of the GIF in a medium resolution, specifically the downsized medium version (`img.images.downsized_medium.url`).

5. **Returning the Data**:
   ```javascript
   return gifs;
   ```
   After mapping the data into a more usable format, the function returns the `gifs` array, which contains the list of GIFs with their `id`, `title`, and `url`.

### How `fetch` Works:
- `fetch` returns a promise that resolves to the `Response` object. The `Response` object contains the response to the request.
- In this case, `await fetch(url)` makes an asynchronous call to the Giphy API and returns a `Response` object when the promise resolves.
- Then `res.json()` is called on the response object, which returns a promise resolving to the parsed JSON data.

### Example Usage:

If you were to call this `getGifs` function and log the result, it might look like this:

```javascript
getGifs('funny').then(gifs => {
  console.log(gifs);
});
```

This would fetch 10 funny GIFs from the Giphy API and log an array of GIF objects with `id`, `title`, and `url`.

### Key Points about `fetch`:
- **Asynchronous**: `fetch` is asynchronous, meaning it doesn't block the code execution while it waits for the API response.
- **Returns a Promise**: `fetch` returns a promise that resolves to the `Response` object.
- **JSON Response**: The `res.json()` method is commonly used to parse JSON data from the response body.
- **Error Handling**: You might want to add error handling (e.g., `try-catch` blocks) in case the fetch request fails, such as when the API is down or the URL is incorrect.

### Example of Error Handling:

```javascript
export const getGifs = async (category) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=84i1PGrZ4pOzjgtV6jO3pDRT9PQ0VmTl&q=${category}&limit=10`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const { data } = await res.json();
        const gifs = data.map(img => ({
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }));
        return gifs;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return [];
    }
}
```

This version of `getGifs` will catch any errors that occur during the fetch process (such as network issues or bad responses) and return an empty array if something goes wrong.