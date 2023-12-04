import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GeneralPokemonType, GeneratedPokemonType } from "../../utils/types";
import { defaultImages, images } from "../../utils/pokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (randomPokemons: GeneralPokemonType[]) => {
    try {
      const pokemonsData: GeneratedPokemonType[] = [];
      for (const pokemon of randomPokemons) {
        const {
          data,
        }: {
          data: {
            id: number;
            types: { type: GeneratedPokemonType }[];
          };
        } = await axios.get(pokemon.url);
        const types = data.types.map(({ type }) => ({
          [type.name]: pokemonTypes[type.name],
        }));
        let image: string = images[data.id];
        if (!image) {
          image = defaultImages[data.id];
        }
        if (image) {
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          });
        }
      }
      return pokemonsData;
    } catch (error) {
      console.log(error);
    }
  }
);
