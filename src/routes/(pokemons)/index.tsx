import { component$ } from "@builder.io/qwik"
import { type DocumentHead } from "@builder.io/qwik-city"
import { PokemonImage } from "~/components/pokemons/pokemon-image"
import { usePokemonGame } from "~/hooks/usePokemonGame"

export default component$(() => {
  const {
    pokemonId,
    backImage,
    isVisible,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
    goToPokemon
  } = usePokemonGame()

  return (
    <>
      <h3 class="text-2xl">Buscador Simple</h3>
      <h2 class="text-9xl -mb-4">{pokemonId.value}</h2>
      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonId.value}
          backImage={backImage.value}
          isVisible={isVisible.value}
        />
      </div>
      <div class="flex gap-4 mt-3">
        <button onClick$={prevPokemon} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          Siguiente
        </button>
        <button onClick$={toggleFromBack} class="btn btn-primary">
          Voltear
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary">
          Revelar
        </button>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primera aplicacion en qwik",
    },
  ],
}
