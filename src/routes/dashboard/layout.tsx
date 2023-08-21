import { Slot, component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import NavCounterDash from '~/components/shared/nav-counter-dash/nav-counter-dash'

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get('jwt')
  if (jwtCookie) return

  redirect(302, '/login')
})

export default component$(() => {
  return (
    <div class="flex flex-col h-full p-4">
      <NavCounterDash />
      <div class="flex flex-col items-center justify-center flex-1">
        <Slot />
      </div>
    </div>
  )
})