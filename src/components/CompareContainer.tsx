import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { removeFromCompare } from "../app/slices/PokemonSlice";
import { pokemonTypes } from "../utils/pokemonTypes";
import {
  PokemonStatType,
  pokemonTypesInterface,
  userPokemonsType,
} from "../utils/types";
import { FaPlus } from "react-icons/fa";
type CompareContainerProps = {
  pokemon: userPokemonsType;
  isEmpty: boolean;
};
const CompareContainer = ({ pokemon, isEmpty }: CompareContainerProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createStatsArray = (
    types: pokemonTypesInterface[],
    statType: PokemonStatType
  ) => {
    const statArray: { name: string; image: string }[] = [];
    const statSet = new Set<string>();
    types.forEach((type) => {
      const key = Object.keys(type)[0];
      type[key][statType].forEach((stat) => {
        if (!statSet.has(stat)) {
          statArray.push({ name: stat, image: pokemonTypes[stat].image });
          statSet.add(stat);
        }
      });
    });
    return statArray;
  };
  const generateStatView = (statType: PokemonStatType) => {
    return (
      <>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">{statType}</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon.types, statType).map((stat) => (
              <div className="pokemon-type">
                <img
                  src={stat.image}
                  alt="stat image"
                  title={stat.name}
                  className="pokemon-type-image"
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  const getStats = () => {
    const statTypes: PokemonStatType[] = [
      "strength",
      "weakness",
      "vulnerable",
      "resistance",
    ];
    return statTypes.map((statType) => generateStatView(statType));
  };
  return (
    <div className="compare-container">
      {isEmpty && (
        <div className="empty">
          <button>
            <FaPlus />
          </button>
          <h3>Add Pokemon to Comparison</h3>
        </div>
      )}
      {pokemon && (
        <div className="compare-element">
          <div className="compare-info">
            <div className="compare-details">
              <h3>{pokemon.name}</h3>
              <img
                src={pokemon.image}
                alt="pokemon"
                className="compare-image"
              />
            </div>
            <div className="pokemon-types-container">
              <div className="pokemon-types">
                <h4 className="pokemon-type-title">Type</h4>
                <div className="pokemon-type-icons">
                  {pokemon.types.map((type) => {
                    const keys = Object.keys(type);
                    return (
                      <div className="pokemon-type">
                        <img
                          src={type[keys[0]].image}
                          alt="pokemon type"
                          className="pokemon-type-image"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {getStats().map((statView) => statView)}
            </div>
          </div>
          <div className="compare-action-buttons">
            <button className="compare-btn">Add</button>
            <button
              className="compare-btn"
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
              View
            </button>
            <button
              className="compare-btn"
              onClick={() => dispatch(removeFromCompare({ id: pokemon.id }))}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareContainer;
