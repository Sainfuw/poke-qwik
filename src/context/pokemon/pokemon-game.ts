import { createContextId } from "@builder.io/qwik"

export type PokemonGameState = {
  pokemonId: number
  backImage: boolean
  isVisible: boolean
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context')