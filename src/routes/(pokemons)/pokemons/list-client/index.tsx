import { $, component$, useStore, useVisibleTask$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getPokemons } from '~/helpers/get-pokemons'
import type { SimplePokemon } from '~/interfaces/pokemon-list.response'

type PokemonState = {
  currentPage: number
  pokemons: SimplePokemon[]
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: []
  })

  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage)

    pokemonState.pokemons = await getPokemons(pokemonState.currentPage * 10)
  })

  const changePage = $((n: number) => {
    if (pokemonState.currentPage + n < 0) return
    pokemonState.currentPage += n
  })

  return (
    <>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl my-5">Status</h3>
        <p>Current page: {pokemonState.currentPage}</p>
        <p>Loading page?: </p>
      </div>
      <div class="mt-10 flex gap-4">
        <button onClick$={() => changePage(-1)} class="btn btn-primary">
          Back
        </button>
        <button onClick$={() => changePage(1)} class="btn btn-primary">
          Next
        </button>
      </div >
      <div class="grid grid-cols-6 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div
              key={name}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage id={id} />
              {name}
            </div>
          ))
        }
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "Client List",
}