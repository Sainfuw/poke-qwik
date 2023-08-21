import { $, useComputed$, useContext } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { PokemonGameContext } from "~/context"

export function usePokemonGame() {
  const pokemonGame = useContext(PokemonGameContext)

  const nav = useNavigate()

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0 || pokemonGame.pokemonId + value >= 151) return
    pokemonGame.pokemonId += value
  })

  const toggleFromBack = $(() => {
    pokemonGame.backImage = !pokemonGame.backImage
  })

  const toggleVisible = $(() => {
    pokemonGame.isVisible = !pokemonGame.isVisible
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}`)
  })

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    backImage: useComputed$(() => pokemonGame.backImage),
    isVisible: useComputed$(() => pokemonGame.isVisible),

    nextPokemon: $(() => changePokemonId(1)),
    prevPokemon: $(() => changePokemonId(-1)),

    toggleFromBack,
    toggleVisible,

    goToPokemon
  }
}