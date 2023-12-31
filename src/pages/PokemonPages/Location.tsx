import { useAppSelector } from "../../app/hooks";

const Location = () => {
  const pokemonData = useAppSelector((state) => state.pokemon.currentPokemon);

  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Location;
