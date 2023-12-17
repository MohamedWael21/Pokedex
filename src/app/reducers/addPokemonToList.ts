import { createAsyncThunk } from "@reduxjs/toolkit";
import { PokemonStatsType, pokemonTypesInterface } from "../../utils/types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypesInterface[] | string[];
      stats?: PokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please Login in order to add pokemon to your collections")
        );
      }
      const index = userPokemons.findIndex((userPokemon) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        if (!pokemon.stats) {
          pokemon.types.forEach((type) => {
            types.push(Object.keys(type).toString());
          });
        } else {
          types = pokemon.types as string[];
        }
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });
        await dispatch(getUserPokemons());
        return dispatch(setToast(`${pokemon.name} added to your collection`));
      } else {
        return dispatch(
          setToast(`${pokemon.name} already part of you collection`)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);
