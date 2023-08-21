import { $, useComputed$, useSignal } from '@builder.io/qwik';

export function useCounter(defaultValue: number = 10) {
  const counter = useSignal(defaultValue)

  const setCounter = $((num: number) => {
    console.log("entro")
    counter.value += num
  })

  return {
    counter: useComputed$(() => counter.value),
    setCounter
  }
}