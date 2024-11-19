import { useState } from "react";
import AddCategory from "./AddCategory";
import GifGrid from "./GifGrid";

function GifExpertApp() {

    // Creating an array list category
    const [categories, setCategories] = useState(['One Punch']);

    // Adding a new category to the list array
    const handleAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories])
    }

    return (
        <>
            <h1>GifExpertApp</h1>

            <AddCategory handleAddCategory={handleAddCategory} />

            {categories.map(category => (
                <GifGrid key={category} category={category} />
            ))}
        </>

    )
}

export default GifExpertApp