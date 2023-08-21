import { Slot, component$ } from '@builder.io/qwik'
import Navbar from '~/components/shared/navbar/navbar'

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center max-w-screen-lg mx-auto">
        <Slot />
      </main>
    </>
  )
})