import PropTypes from "prop-types";
import { useState } from "react";

function CounterApp({ value }) {
    const [counter, setCounter] = useState(value);

    const incrementBy1 = () => {
        setCounter(prevCounter => prevCounter + 1);
    }

    const decrementBy1 = () => {
        setCounter(prevCounter => prevCounter - 1);
    }

    const reset = () => {
        setCounter(value);
    }

    return (
        <>
            <h1>CounterApp</h1>
            <h2>{counter}</h2>
            <button onClick={incrementBy1}>Increment</button>
            <button onClick={decrementBy1}>Decrement</button>
            <button onClick={reset}>Reset</button>
        </>
    )
}

export default CounterApp;

CounterApp.propTypes = {
    value: PropTypes.number
}