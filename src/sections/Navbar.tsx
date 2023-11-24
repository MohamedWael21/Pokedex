import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
const navigationRoutes = [
  {
    name: "Search",
    route: "/search",
  },
  {
    name: "Compare",
    route: "/compare",
  },
  {
    name: "Pokemon",
    route: "/pokemon",
  },
  {
    name: "My List",
    route: "/list",
  },
  {
    name: "About",
    route: "/about",
  },
];
const Navbar = () => {
  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="pokeball icon" />
      </div>
      <div className="data"></div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
