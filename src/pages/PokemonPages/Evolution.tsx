import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { getPokemonsData } from "../../app/reducers/getPokemonsData";
import PokemonCardGrid from "../../components/PokemonCardGrid";
const Evolution = () => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { currentPokemon, randomPokemons } = useAppSelector(
    (state) => state.pokemon
  );
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
      await dispatch(getPokemonsData(pokemons!));
      setIsLoaded(true);
    };
    fetchData();
  }, [currentPokemon, dispatch]);
  return (
    <div className="page">
      {isLoaded && <PokemonCardGrid pokemons={randomPokemons} />}
    </div>
  );
};

export default Evolution;
