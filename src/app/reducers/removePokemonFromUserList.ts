import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";

export const removePokemonFromUserList = createAsyncThunk(
  "pokemon/removeUserPokemon",
  async ({ id }: { id: string | undefined }) => {
    try {
      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch (error) {
      console.log(error);
    }
  }
);
