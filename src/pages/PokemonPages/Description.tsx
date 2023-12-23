import { useAppSelector } from "../../app/hooks";
import Info from "../../components/Info";
import PokemonContainer from "../../components/PokemonContainer";

const Description = () => {
  const pokemonData = useAppSelector((state) => state.pokemon.currentPokemon);

  return (
    <>
      {pokemonData && (
        <>
          <Info data={pokemonData} />
          <PokemonContainer image={pokemonData?.image} />
        </>
      )}
    </>
  );
};

export default Description;
