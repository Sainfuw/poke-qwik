import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { InfiniteScrollContext } from '~/context/pokemon/infinite-scroll'
import { getPokemons } from '~/helpers/get-pokemons'

export default component$(() => {
  const scrollState = useContext(InfiniteScrollContext)

  useTask$(async ({ track }) => {
    track(() => scrollState.currentPage)
    const resp = await getPokemons(scrollState.currentPage * 30, 30)
    scrollState.pokemons = [...scrollState.pokemons, ...resp]
    scrollState.loading = false
  })

  useOnDocument(
    'scroll',
    $(() => {
      if (scrollState.loading) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const currenScroll = window.scrollY

      if (currenScroll + 100 >= maxScroll) {
        scrollState.loading = true
        scrollState.currentPage++
      }
    })
  )

  return (
    <>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl my-5">Status</h3>
        <p>Current page: {scrollState.currentPage}</p>
        <p>Loading page?: </p>
      </div>
      <div class="grid grid-cols-4">
        {
          scrollState.pokemons.map(({ name, id }) => (
            <div
              key={name}
              class="flex flex-col justify-center items-center"
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