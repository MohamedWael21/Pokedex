export interface AppTypeInitialState {
  toasts: string[];
}
export interface PokemonTypeInitialState {
  allPokemon: undefined | GeneralPokemonType[];
  randomPokemons: undefined | GeneratedPokemonType[];
  compareQueue: GeneratedPokemonType[];
}

export interface GeneralPokemonType {
  name: string;
  url: string;
}

export interface GeneratedPokemonType {
  name: string;
  id: number;
  image: string;
  types: pokemonTypesInterface[];
}

export interface pokemonTypesInterface {
  [key: string]: {
    image: string;
    vulnerable: string[];
    resistance: string[];
    weakness: string[];
    strength: string[];
  };
}

export interface userPokemonsType extends GeneratedPokemonType {
  firebaseId?: string;
}

export type PokemonStatType =
  | "vulnerable"
  | "weakness"
  | "strength"
  | "resistance";
