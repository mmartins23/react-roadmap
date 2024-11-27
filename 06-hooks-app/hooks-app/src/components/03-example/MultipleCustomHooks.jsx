import useCounter from "../../hooks/useCounter";
import useFetch from "../../hooks/useFetch";
import LoadingMessage from "./LoadingMessage";
import PokemonCard from "./PokemonCard";

const MultipleCustomHooks = () => {
    const { counter, decrement, increment } = useCounter(25);
    const { data, isLoading } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);
  
    return (
      <>
        <h1>Pokémon Information</h1>
        <hr />
  
        {isLoading ? (
          <LoadingMessage />
        ) : data ? ( // Ensure 'data' is not null
          <PokemonCard
            id={counter}
            name={data.name}
            sprites={[
              data.sprites.front_default,
              data.sprites.front_shiny,
              data.sprites.back_default,
              data.sprites.back_shiny,
            ]}
          />
        ) : (
          <p>No data available</p> // Handle the case where data is null or invalid
        )}
  
        <button
          className="btn btn-primary mt-2"
          onClick={() => counter > 1 ? decrement(1) : null}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mt-2"
          onClick={() => increment(1)}
        >
          Next
        </button>
      </>
    );
  };
  
export default MultipleCustomHooks;
  