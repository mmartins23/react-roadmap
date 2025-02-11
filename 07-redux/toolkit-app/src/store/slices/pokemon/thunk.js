import { startLoadingPokemon, setPokemon } from './pokemonSlice';   
import { PokemonAPI } from '../../../API/pokemonAPI';

export const getPokemon = (page = 0) =>  {
    return async (dispatch) => {
        dispatch(startLoadingPokemon());

       // http request to fetch pokemons
        const res = await fetch(`${PokemonAPI.baseURL}/pokemon?limit=10&offset=${page * 10}`);
        const data = await res.json();
        dispatch(setPokemon({ pokemons: data.results, page: page +1 }));
    }
}