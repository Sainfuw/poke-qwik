import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks';

export default component$(() => {
  const { counter, setCounter } = useCounter(15)

  return (
    <>
      <h3 class="text-2xl">Counter</h3>
      <h2 class="text-9xl">{counter.value}</h2>
      <div class="flex gap-4">
        <button onClick$={() => setCounter(-1)} class="btn btn-primary">-</button>
        <button onClick$={() => setCounter(1)} class="btn btn-primary">+</button>
      </div>
    </>
  )
});