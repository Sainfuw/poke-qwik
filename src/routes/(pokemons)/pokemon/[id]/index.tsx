import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonGame } from '~/hooks/usePokemonGame'

export const usePokemonId = routeLoader$(({ params, redirect }) => {
  const id = Number(params.id)

  if (isNaN(id)) redirect(301, '/')
  if (id <= 0 || id >= 151) redirect(304, '/')

  return id
})

export default component$(() => {
  const id = usePokemonId()
  const { backImage, isVisible, toggleFromBack, toggleVisible } = usePokemonGame()

  return (
    <div>
      <PokemonImage
        id={id.value}
        backImage={backImage.value}
        isVisible={isVisible.value}
      />
      <div class="flex gap-4 mt-3">
        <button onClick$={toggleFromBack} class="btn btn-primary">
          Voltear
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary">
          Revelar
        </button>
      </div>
    </div>
  )
})