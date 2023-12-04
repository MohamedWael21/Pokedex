import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { getPokemonsData } from "../app/reducers/getPokemonsData";
import PokemonCardGrid from "../components/PokemonCardGrid";
import Wrapper from "../sections/Wrapper";
import { useEffect } from "react";
import { debounce } from "../utils/deBounce";
const Search = () => {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, []);

  useEffect(() => {
    if (allPokemon) {
      const clonnedPokemons = [...allPokemon];
      const randomPokemonsId = clonnedPokemons
        .sort(() => {
          return Math.random() - Math.random();
        })
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemon]);
  const handleChange = debounce((value: string) => getPokemon(value), 300);
  const getPokemon = (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      if (pokemons) {
        dispatch(getPokemonsData(pokemons));
      }
    } else {
      const clonnedPokemons = [...allPokemon!];
      const randomPokemonsId = clonnedPokemons
        .sort(() => {
          return Math.random() - Math.random();
        })
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          placeholder="Search Pokemon"
          onChange={(e) => handleChange(e.target.value)}
        />
        <PokemonCardGrid pokemons={randomPokemons} />
      </div>
    </>
  );
};

export default Wrapper(Search);
