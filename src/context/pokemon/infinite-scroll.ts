import { createContextId } from "@builder.io/qwik"
import type { SimplePokemon } from "~/interfaces/pokemon-list.response"

export type InfiniteScroll = {
  currentPage: number
  pokemons: SimplePokemon[],
  loading: boolean
}

export const InfiniteScrollContext = createContextId<InfiniteScroll>('infinite-scroll')