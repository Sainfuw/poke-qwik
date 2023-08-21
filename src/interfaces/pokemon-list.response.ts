export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: SimplePokemon[];
}

export type SimplePokemon = {
  id: number;
  name: string;
  url: string;
}