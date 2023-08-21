import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <nav class="flex justify-between items-center">
      <h2 class="text-2xl font-bold hover:text-purple-700"><Link href='/'>CounterPage</Link></h2>
      <ul class="flex gap-8">
        <li class="hover:text-purple-700"><Link href="/login">Login</Link></li>
        <li class="hover:text-purple-700"><Link href="/dashboard">Dashboard</Link></li>
        <li class="hover:text-purple-700"><Link href='/counter'>CounterHook</Link></li>
        <li class="hover:text-purple-700"><Link href='/pokemons/list-ssr'>SSR List</Link></li>
        <li class="hover:text-purple-700"><Link href='/pokemons/list-client'>Client List</Link></li>
        <li class="hover:text-purple-700"><Link href='/pokemons/infinite-scroll'>Infinite-Scroll</Link></li>
      </ul>
    </nav>
  )
});