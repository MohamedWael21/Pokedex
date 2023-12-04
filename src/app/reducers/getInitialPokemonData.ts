import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { POKEMONS_ROUTE } from "../../utils/constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initial",
  async () => {
    try {
      const {
        data: { results },
      } = await axios.get(POKEMONS_ROUTE);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
);
