export interface AppTypeInitialState {
  toasts: string[];
  userInfo: undefined | { email: string; uid: string };
  currentPokemonTab: string;
}
export interface PokemonTypeInitialState {
  allPokemon: undefined | GeneralPokemonType[];
  randomPokemons: undefined | GeneratedPokemonType[];
  compareQueue: GeneratedPokemonType[];
  userPokemons: userPokemonsType[];
  currentPokemon: undefined | CurrentPokemonType;
}

export interface CurrentPokemonType {
  id: number;
  name: string;
  types: pokemonTypesInterface[];
  image: string;
  stats: PokemonStatsType[];
  encounters: string[];
  evolution: { level: number; pokemon: { name: string; url: string } }[];
  pokemonAbilities: { abilities: string[]; moves: string[] };
  evolutionLevel: number;
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

export interface PokemonStatsType {
  name: string;
  value: string;
}
