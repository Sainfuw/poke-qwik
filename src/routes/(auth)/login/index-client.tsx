import { $, component$, useComputed$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const formState = useStore({
    email: 'oops@chile.cl',
    password: '123456',
    formPosted: false
  })

  const emailError = useComputed$(() => {
    return formState.email.includes('@')
      ? 'valid'
      : 'not-valid'
  })

  const passwordError = useComputed$(() => {
    return formState.password.length > 4
      ? "valid"
      : "not-valid"
  })

  const isFormValid = useComputed$(() => {
    return !(emailError.value === 'not-valid' || passwordError.value === 'not-valid')
  })

  const onSubmit = $(() => {
    formState.formPosted = true
    const { email, password } = formState

    console.log({ isFormValid: isFormValid.value })
    console.log({ email, password })
  })

  return (
    <form
      onSubmit$={onSubmit}
      preventdefault: submit
      class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 min-w-[240px] flex flex-col gap-6"
    >
      <div class="relative z-0 group">
        <input
          type="email"
          value={formState.email}
          onInput$={(e) => formState.email = (e.target as HTMLInputElement).value}
          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer ${formState.formPosted ? emailError.value : 'valid'}`}
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
          value={formState.password}
          onInput$={(e) => formState.password = (e.target as HTMLInputElement).value}
          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer ${formState.formPosted ? passwordError.value : 'valid'}`}
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
      <code
        class="block whitespace-pre text-sm w-80"
      >
        {JSON.stringify(formState, undefined, 2)}
      </code>
    </form>
  )
});