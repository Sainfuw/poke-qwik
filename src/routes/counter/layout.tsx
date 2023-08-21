import { Slot, component$ } from '@builder.io/qwik';
import NavCounterDash from '~/components/shared/nav-counter-dash/nav-counter-dash';

export default component$(() => {
  return (
    <div class="flex flex-col h-full p-4">
      <NavCounterDash />
      <div class="flex flex-col items-center justify-center flex-1">
        <Slot />
      </div>
    </div>
  )
});