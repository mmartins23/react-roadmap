#### Component: `GifGrid`

The `GifGrid` component fetches and displays a grid of GIFs based on the provided `category`. It shows a loading message while fetching and renders a list of `GifItem` components for the retrieved images.

```javascript
import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";
import PropTypes from 'prop-types';

function GifGrid({ category }) {
    const { images, isLoading } = useFetchGifs(category);
    // Custom hook `useFetchGifs` returns the images and a loading state.

    return (
        <>
            <h3>{category}</h3>
            {/* Display the category name as a heading. */}

            {isLoading && (<h2>Loading...</h2>)}
            {/* Show a loading message while data is being fetched. */}

            <div className="card-grid">
                {/* Render a grid of GIF items. */}
                {images.map((image) => (
                    <GifItem key={image.id} {...image} />
                    // Pass each image's data to the GifItem component.
                ))}
            </div>
        </>
    );
}

export default GifGrid;

GifGrid.propTypes = {
    category: PropTypes.string.isRequired,
    // Require a string `category` prop to define the GIF topic.
};
```

---

### Test Cases

#### Test 1: Initial Loading State

```javascript
test('should display loading initially', () => {
    useFetchGifs.mockReturnValue({
        images: [],
        isLoading: true,
        // Simulate the hook's initial state: no images and loading in progress.
    });

    render(<GifGrid category={category} />);
    // Render the GifGrid component with a test category.

    expect(screen.getByText('Loading...')).toBeTruthy();
    // Assert that the "Loading..." message is displayed.
    expect(screen.getByText(category)).toBeTruthy();
    // Assert that the category name is displayed.
});
```

**Purpose:**  
This test verifies the behavior of the component during the loading phase:
- The "Loading..." message is displayed.
- The category name is shown.

---

#### Test 2: Displaying Fetched Images

```javascript
test('should display items when images are loaded from useFetchGifs', () => {
    const gifs = [
        {
            id: 'ABC',
            title: 'Saitama',
            url: 'https://localhost/saitama.jpg',
        },
        {
            id: '123',
            title: 'Goku',
            url: 'https://localhost/goku.jpg',
        },
    ];
    // Mock data representing GIFs fetched by the custom hook.

    useFetchGifs.mockReturnValue({
        images: gifs,
        isLoading: false,
        // Simulate the hook's state after images have been fetched.
    });

    render(<GifGrid category={category} />);
    // Render the GifGrid component with the test category.

    expect(screen.getAllByRole('img').length).toBe(2);
    // Assert that two image elements are rendered (one for each GIF).
});
```

**Purpose:**  
This test ensures that the component correctly renders the fetched images:
- The hook's data is mocked to simulate fetched images.
- The number of rendered images matches the length of the mock data.

---

### Summary of Tests

1. **Initial Loading:**  
   Confirms that the component:
   - Displays "Loading..." during the data-fetching phase.
   - Displays the category name.

2. **Image Rendering:**  
   Validates that:
   - The `GifGrid` component renders `GifItem` components based on the fetched images.
   - The number of rendered images matches the data from `useFetchGifs`.

---

### Jest Mocking: `useFetchGifs`

The `useFetchGifs` hook is mocked in the test suite to isolate the component's behavior from the actual hook's implementation. Mocking ensures:
- Test reliability (not dependent on external API calls or actual data).
- Control over the hook's returned data.  

```javascript
jest.mock('../../src/hooks/useFetchGifs.js');
// Mock the `useFetchGifs` module to return custom values during tests.
```