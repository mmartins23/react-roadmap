import { useState } from "react"

function useCounter(initialValue = 1) {
    const [counter, setCounter] = useState(initialValue);

    const increment = (value) => {
        setCounter(prevCounter => prevCounter + value);
    }

    const decrement = (value) => {
        if(counter === 0) return;
        setCounter(prevCounter => prevCounter - value);
    }

    const reset = () => {
        setCounter(initialValue);
    }

    return {
        counter,
        increment,
        decrement,
        reset
    }
}

export default useCounter;