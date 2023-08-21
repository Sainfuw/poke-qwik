import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

type Props = {
  id: number | string
  backImage?: boolean
  isVisible?: boolean
}

export const PokemonImage = component$(({ id, backImage = false, isVisible = true }: Props) => {
  const imageLoaded = useSignal(false)
  const px = 220

  useTask$(({ track }) => {
    track(() => id)
    imageLoaded.value = false
  })

  const imageUrl = useComputed$(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${backImage ? '/back' : ''}/${id}.png`
  })

  return (
    <div class="flex items-center justify-center">
      {!imageLoaded.value &&
        <span class="text-gray-400">Cargando...</span>
      }
      <img
        src={imageUrl.value} alt=""
        width={px}
        height={px}
        onLoad$={() => imageLoaded.value = true}
        class={[
          { 'hidden': !imageLoaded.value, 'brightness-0': !isVisible },
          'transition-all'
        ]}
      />
    </div>
  )
})