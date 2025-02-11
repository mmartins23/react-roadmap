import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement,incrementBy } from './store/slices/counter/counterSlice';

function App() {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Count is: {counter}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementBy(2))}>Increment by 2</button>
      </div>
    </>
  )
}

export default App
