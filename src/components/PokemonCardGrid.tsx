import { userPokemonsType } from "../utils/types";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCompare } from "../app/slices/PokemonSlice";
import { setToast } from "../app/slices/AppSlice";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { removePokemonFromUserList } from "../app/reducers/removePokemonFromUserList";
type PokemonCardGridProps = {
  pokemons: undefined | userPokemonsType[];
};
const PokemonCardGrid = ({ pokemons }: PokemonCardGridProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((pokemon) => {
            return (
              <div className="pokemon-card" key={pokemon.id}>
                <div className="pokemon-card-list">
                  {location.pathname.includes("/pokemon") ||
                  location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(pokemon))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={() =>
                        dispatch(
                          removePokemonFromUserList({ id: pokemon.firebaseId })
                        )
                      }
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispatch(addToCompare(pokemon));
                      dispatch(
                        setToast(
                          `Pokemon ${pokemon.name} has been added to Compare Queue`
                        )
                      );
                    }}
                  />
                </div>
                <h3 className="pokemon-card-title">{pokemon.name}</h3>
                <img
                  src={pokemon.image}
                  alt="pokemon"
                  className="pokemon-card-img"
                  loading="lazy"
                  onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                />
                <div className="pokemon-card-types">
                  {pokemon.types.map((type, index) => {
                    const keys = Object.keys(type);
                    return (
                      <div className="pokemon-card-types-type" key={index}>
                        <img
                          src={type[keys[0]].image}
                          alt=""
                          className="pokemon-card-types-type-img"
                        />
                        <h6 className="pokemon-card-types-type-text">
                          {keys[0]}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PokemonCardGrid;
