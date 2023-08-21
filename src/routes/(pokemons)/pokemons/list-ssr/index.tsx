import { component$, useComputed$ } from '@builder.io/qwik'
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { Modal } from '~/components/shared'
import { getPokemons } from '~/helpers/get-pokemons'
import type { SimplePokemon } from '~/interfaces/pokemon-list.response'

export const usePokemonList = routeLoader$<SimplePokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || 0)
  if (isNaN(offset)) redirect(301, pathname)

  return await getPokemons(offset)
})

export default component$(() => {
  const pokemons = usePokemonList()
  const location = useLocation()

  const currentOffset = useComputed$(() => {
    const offsetString = location.url.searchParams.get('offset')
    return Number(offsetString) || 0
  })

  const changeOffset = (offset: number) => {
    if (currentOffset.value + offset < 0) return 0
    return currentOffset.value + offset
  }

  return (
    <>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl my-5">Status</h3>
        <p>Current offset: {currentOffset}</p>
        <p>Loading page?: {location.isNavigating ? 'Yes' : 'No'}</p>
      </div>
      <div class="mt-10 flex gap-4">
        <Link href={`/pokemons/list-ssr/?offset=${changeOffset(-10)}`} class="btn btn-primary">
          Back
        </Link>
        <Link href={`/pokemons/list-ssr/?offset=${changeOffset(10)}`} class="btn btn-primary">
          Next
        </Link>
      </div >
      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <Modal key={name} id={id} name={name}>
              <div class="m-5 flex flex-col justify-center items-center">
                <PokemonImage id={id} />
                {name}
              </div>
            </Modal>
          ))
        }
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "SSR List",
}