#### Custom Hook: `useFetchGifs`

The `useFetchGifs` custom hook fetches GIFs based on a given category and manages the loading state for displaying the fetched data. This hook leverages the helper function `getGifs` and React's state management capabilities (`useState`, `useEffect`, and `useCallback`).

#### Code Breakdown: `useFetchGifs`

```javascript
import { useEffect, useState, useCallback } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    // State to hold the array of fetched GIFs.
    const [isLoading, setIsLoading] = useState(true);
    // State to track whether the data is still loading.

    // Memoize the function to avoid unnecessary re-creation on re-renders.
    const getImages = useCallback(async () => {
        const newImages = await getGifs(category);
        // Fetches GIFs using the helper function.
        setImages(newImages);
        // Updates the images state with the fetched data.
        setIsLoading(false);
        // Sets loading state to false after the data is fetched.
    }, [category]); // Dependencies ensure the function updates if the `category` changes.

    useEffect(() => {
        getImages();
        // Invokes the `getImages` function when the hook is initialized or the `category` changes.
    }, [getImages]);

    // Return the state and loading status.
    return {
        images,
        isLoading,
    };
};
```

---

### Jest Tests for `useFetchGifs`

These tests verify the behavior of the custom hook `useFetchGifs` using the **React Testing Library's** `renderHook` utility, which allows testing hook logic independently.

#### Test 1: Verifying Initial State

```javascript
test('should return the initial state', () => {
    const { result } = renderHook(() => useFetchGifs('Pokemon'));
    // Render the `useFetchGifs` hook with the category 'Pokemon'.

    const { images, isLoading } = result.current;
    // Access the current state of the hook.

    expect(images.length).toBe(0);
    // Assert that the initial `images` array is empty.
    expect(isLoading).toBeTruthy();
    // Assert that the initial `isLoading` state is `true`.
});
```

#### Explanation:

- Initially, `images` should be an empty array, as no data has been fetched yet.
- The `isLoading` state should be `true`, indicating the fetching process is ongoing.

---

#### Test 2: Verifying Fetched Data and Final State

```javascript
test('should return an array of images and isLoading in false', async () => {
    const { result } = renderHook(() => useFetchGifs('Pokemon'));
    // Render the `useFetchGifs` hook with the category 'Pokemon'.

    await waitFor(() => expect(result.current.images.length).toBeGreaterThan(0));
    // Wait until the `images` array has at least one item.

    const { images, isLoading } = result.current;
    // Access the updated state of the hook.

    expect(images.length).toBeGreaterThan(0);
    // Assert that the `images` array contains elements.
    expect(isLoading).toBeFalsy();
    // Assert that `isLoading` is `false` after the data is fetched.
});
```

#### Explanation:

- The test waits for the `images` array to be populated (i.e., its length is greater than 0).
- After fetching, `isLoading` should be `false` because the data has been successfully retrieved.

---

### Key Utilities in the Test

1. **`renderHook`:**  
   Used to render and test custom hooks independently, returning the hook's result and a mechanism to update its behavior.

2. **`waitFor`:**  
   Waits asynchronously for a condition to be met. This is crucial for testing hooks or components with asynchronous operations, like fetching data.

---

### Summary

#### **What Does the Hook Do?**

- Fetches GIFs asynchronously using a category.
- Manages state for the fetched images and a loading indicator.
- Reactively updates when the category changes.

#### **What Do the Tests Verify?**

1. **Initial Behavior:**  
   - Before fetching, the `images` array should be empty, and `isLoading` should be `true`.

2. **Post-Fetch Behavior:**  
   - After fetching, the `images` array should contain GIF data, and `isLoading` should be `false`.

#### **Why Is This Important?**

- Custom hooks encapsulate reusable logic, and testing ensures they behave consistently across scenarios.
- By validating initial and post-fetch states, the tests confirm that the hook works as expected.