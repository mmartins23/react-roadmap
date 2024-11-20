/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { GifItem } from "../../components/GifItem";

describe("GifItem Component", () => {
    const title = "Sample GIF";
    const url = "https://media.giphy.com/media/sample.gif";

    test("should render the image with the correct URL and alt text", () => {
        render(<GifItem title={title} url={url} />);
        // This line will print the rendered HTML to the console.
        // screen.debug();

        // Check if the image is in the document
        const imgElement = screen.getByRole("img");
        expect(imgElement).toBeInTheDocument();

        // Validate image attributes
        expect(imgElement).toHaveAttribute("src", url);
        expect(imgElement).toHaveAttribute("alt", title);
    });

    test("should display the title in a paragraph", () => {
        render(<GifItem title={title} url={url} />);

        // Check if the title is rendered in a paragraph
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
    });
});