import PropTypes from "prop-types";
import { useState } from "react";

function AddCategory({ handleAddCategory }) {
    const [inputValue, setInputValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim().length <= 1) return;
        setInputValue('');
        handleAddCategory(inputValue.trim());
    };


    return (
        <form onSubmit={onSubmit} aria-label="form">
            <input
                type="text"
                placeholder="Search for gifs"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
        </form>
    );
}

export default AddCategory;


AddCategory.propTypes = {
    handleAddCategory: PropTypes.func.isRequired,
}