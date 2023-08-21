import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, event) => {
  const { cookie, redirect } = event
  const { email, password } = data
  if (email === "oops@chile.com" && password === "123456") {
    cookie.set('jwt', 'my_personal_jwt', { secure: true, path: "/" })
    redirect(302, "/")
    // return { success: true, jwt: "my_personal_jwt" }
  }
  // return { success: false }
}, zod$({
  email: z.string().email("Format not valid"),
  password: z.string().min(4, "MinLength 4 characters")
}))

export default component$(() => {
  const action = useLoginUserAction()

  return (
    <Form
      action={action}
      class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 min-w-[240px] flex flex-col gap-6"
    >
      <div class="relative z-0 group">
        <input
          type="email"
          name="email"
          value="oops@chile.com"
          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
          placeholder=" "
          required
        />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div class="relative z-0 w-full group">
        <input
          type="password"
          name="password"
          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer`}
          placeholder=" "
          required
        />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <button
        type="submit"
        class="bg-purple-500 text-white rounded-md px-2 py-1 w-full hover:bg-purple-700 transition-all"
      >
        Ingresar
      </button>
      {/* {action.value?.success && (
        <div class="px-4 py-2 bg-green-300 rounded-md text-sm text-center">
          <p>Authenticated with Token: {action.value.jwt}</p>
        </div>
      )} */}
      <code
        class="block whitespace-pre text-sm w-80"
      >
        {JSON.stringify(action.value, undefined, 2)}
      </code>
    </Form>
  )
});