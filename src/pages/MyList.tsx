import { useAppDispatch, useAppSelector } from "../app/hooks";
import Wrapper from "../sections/Wrapper";
import Login from "../components/Login";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { useEffect } from "react";
import { getUserPokemons } from "../app/reducers/getUserPokemons";

const MyList = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const { userPokemons } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo]);
  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
};

export default Wrapper(MyList);
