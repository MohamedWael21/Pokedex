import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemonTab, setToast, setUserStatus } from "../app/slices/AppSlice";
import { POKEMON_TABS } from "../utils/constants";
import { useLocation } from "react-router-dom";
const routes = [
  {
    name: POKEMON_TABS.description,
    value: "Description",
  },
  {
    name: POKEMON_TABS.evolution,
    value: "Evolution",
  },
  {
    name: POKEMON_TABS.locations,
    value: "Catching",
  },
  {
    name: POKEMON_TABS.moves,
    value: "Capable Moves",
  },
];
const Footer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentPokemonTab } = useAppSelector((state) => state.app);
  const handleLogOut = async () => {
    await signOut(firebaseAuth);
    await dispatch(setUserStatus(undefined));
    dispatch(setToast("Log Out successFully"));
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => (
              <li
                key={route.name}
                className={`${
                  currentPokemonTab === route.name ? "active" : ""
                } `}
                onClick={() => {
                  dispatch(setPokemonTab(route.name));
                }}
              >
                {route.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogOut} />
      </div>
    </footer>
  );
};

export default Footer;
