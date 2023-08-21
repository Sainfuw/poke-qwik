import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { InfiniteScroll } from './infinite-scroll';
import { InfiniteScrollContext } from './infinite-scroll';
import type { PokemonGameState } from './pokemon-game';
import { PokemonGameContext } from './pokemon-game';

export default component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    backImage: false,
    isVisible: true
  })

  const scrollState = useStore<InfiniteScroll>({
    currentPage: 0,
    pokemons: [],
    loading: false
  })

  useContextProvider(PokemonGameContext, pokemonGame)
  useContextProvider(InfiniteScrollContext, scrollState)

  useVisibleTask$(() => {
    // Leer desde el localstorage
    const data = JSON.parse(localStorage.getItem('pokemon-game') || '') as PokemonGameState
    pokemonGame.pokemonId = data.pokemonId
    pokemonGame.backImage = data.backImage
    pokemonGame.isVisible = data.isVisible

    // const data2 = JSON.parse(localStorage.getItem('infinite-scroll') || '') as InfiniteScroll
    // scrollState.currentPage = data2.currentPage
    // scrollState.pokemons = data2.pokemons
  })

  useVisibleTask$(({ track }) => {
    // Cambiar el localstorage
    // track(() => [...Object.entries(pokemonGame), scrollState.pokemons])
    track(() => Object.entries(pokemonGame))
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    // localStorage.setItem('infinite-scroll', JSON.stringify(scrollState))
  })

  return (
    <Slot />
  )
});