#### Function: `getGifs`

The `getGifs` function fetches GIF data from the Giphy API based on a given category and returns a transformed array of objects.

```javascript
export const getGifs = async (category) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=84i1PGrZ4pOzjgtV6jO3pDRT9PQ0VmTl&q=${category}&limit=10`;
    // Constructs the API URL dynamically using the provided category and a limit of 10 results.

    const res = await fetch(url);
    // Fetches the data from the Giphy API.
    const { data } = await res.json();
    // Parses the JSON response and extracts the `data` array containing GIF information.

    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url,
    }));
    // Transforms the raw API data into a simpler format containing only the necessary fields.

    return gifs;
    // Returns the transformed array of GIF objects.
};
```

---

### Test Cases for `getGifs`

The test suite validates the functionality of the `getGifs` helper function by mocking a category search.

#### Test: Return an Array of GIFs

```javascript
test('should return an array of gifs', async() => {
    const gifs = await getGifs('One Punch');
    // Calls the `getGifs` function with the category 'One Punch'.

    expect(gifs.length).toBeGreaterThan(0);
    // Asserts that the returned array contains at least one GIF.

    expect(gifs[0]).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
    });
    // Asserts that the first object in the array matches the expected structure:
    // - `id`, `title`, and `url` should be strings.
});
```

---

### Breakdown of Key Elements

#### **Fetching Data from Giphy API**

- **API URL Construction:** The API URL includes:
  - **API Key:** Authentication for Giphy API.
  - **`q=${category}`:** Query parameter for the category.
  - **`limit=10`:** Restricts the result set to 10 GIFs.

#### **Transforming API Response**

- **Extract Relevant Data:**  
  The `map` method simplifies the raw API response into an array of objects with:
  - **`id`:** Unique identifier of the GIF.
  - **`title`:** Title or description of the GIF.
  - **`url`:** Direct URL to the downsized medium version of the GIF.

---

### Jest Test Explanation

1. **Calling `getGifs` with a Category:**
   - The test calls `getGifs('One Punch')` to fetch GIFs related to the category "One Punch."

2. **Expecting an Array:**
   - The test validates that the returned array contains at least one element using `toBeGreaterThan(0)`.

3. **Verifying Array Elements:**
   - The test checks that the first element has the following structure:
     - **`id`:** A string (`expect.any(String)`).
     - **`title`:** A string (`expect.any(String)`).
     - **`url`:** A string (`expect.any(String)`).

---

### Jest Utilities Used

- **`toBeGreaterThan(value):`**  
  Validates that a numerical value is greater than the specified `value`.

- **`expect.any(Type):`**  
  Ensures that the value matches the given type (e.g., `String`).

- **`toEqual(object):`**  
  Compares the equality of objects, allowing for matchers like `expect.any` for flexible validation.

---

### Final Notes

- **Why Test This?**  
  Testing ensures that the `getGifs` function:
  - Successfully fetches data.
  - Processes the API response correctly.
  - Returns the expected structure for each GIF.

- **Practical Usage:**  
  This function is essential for dynamically fetching and displaying GIFs in the application. By testing its behavior, you can prevent runtime errors and ensure reliability in production.