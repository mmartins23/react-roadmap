import { useEffect, useState, useCallback } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize the function to avoid recreating it on every render
    const getImages = useCallback(async () => {
        const newImages = await getGifs(category);
        setImages(newImages);
        setIsLoading(false);
    }, [category]); // Dependency ensures it updates if `category` changes

    useEffect(() => {
        getImages();
    }, [getImages]); // Safe to include `getImages` as a dependency


    return {
        images,
        isLoading
    }
}
