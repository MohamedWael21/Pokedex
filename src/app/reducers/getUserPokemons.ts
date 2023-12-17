import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { query, where, getDocs } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { userPokemonsType } from "../../utils/types";
import { defaultImages, images } from "../../utils/pokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userPokemons",
  async (_, { getState }): Promise<userPokemonsType[]> => {
    try {
      const {
        app: { userInfo },
      } = getState() as RootState;
      if (!userInfo) {
        return [];
      }
      const fireStoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email)
      );
      const fetchedPokemons = await getDocs(fireStoreQuery);
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];
        fetchedPokemons.forEach(async (pokemonRef) => {
          const pokemon = await pokemonRef.data().pokemon;
          let image = images[pokemon.id];
          if (!image) {
            image = defaultImages[pokemon.id];
          }
          const types = pokemon.types.map((name: string) => ({
            [name]: pokemonTypes[name],
          }));
          userPokemons.push({
            ...pokemon,
            firebaseId: pokemonRef.id,
            image,
            types,
          });
        });
        return userPokemons;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);
