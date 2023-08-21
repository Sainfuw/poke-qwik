import type { PokemonListResponse, SimplePokemon } from "~/interfaces/pokemon-list.response"

export async function getPokemons(offset: number = 0, limit: number = 10): Promise<SimplePokemon[]> {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await resp.json() as PokemonListResponse
  return data.results.map(poke => {
    return {
      id: Number(poke.url.split('/').at(-2)),
      name: poke.name,
      url: poke.url,
    }
  })
}