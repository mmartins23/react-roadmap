import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getPokemon } from "./store/slices/pokemon/thunk";

const PokemonApp = () => {

  const dispatch = useDispatch();
  const { isLoading, pokemons = [], page} = useSelector(state => state.pokemon);


  useEffect(() => { 
    dispatch(getPokemon());
  }, [dispatch]) 

  return (
    <>
    <h1>PokemonApp</h1>
    <hr/>
    <span>{isLoading ? 'Loading...' : ''}</span>
    <ul>
       {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
       ))}
    </ul>
    <button onClick={() => dispatch(getPokemon(page))}>Load More</button>
    </>
  )
}

export default PokemonApp