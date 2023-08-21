import { Fragment, Slot, component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import type { PokeDescription } from '~/interfaces/pokemon-description';
import ModalStyles from './modal.css?inline';

type ModalProps = {
  id: number
  name: string
}

export const Modal = component$(({ id, name }: ModalProps) => {
  useStylesScoped$(ModalStyles);

  const modalVisible = useSignal(false)
  const pokeDescription = useSignal('')

  useVisibleTask$(async () => {
    const detail = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const data = await detail.json() as PokeDescription
    pokeDescription.value = data.flavor_text_entries[0].flavor_text
  })

  return (
    <>
      <div onClick$={() => modalVisible.value = !modalVisible.value}>
        <Slot />
      </div>
      {
        modalVisible.value &&
        <div class="modal-background" id="modal-content" onClick$={(event) => {
          const elementId = (event.target as HTMLDivElement).id
          if (elementId === 'modal-content') modalVisible.value = false
        }}>
          <div class={["modal-content", "modal-md"]}>
            <div class="mt-3 text-center">
              <h3 class="modal-title">{name}</h3>
              <PokemonImage id={id} />
              <div class="mt-2 px-7 py-3">
                <div class="modal-content-text">
                  {pokeDescription.value.split('\n').map((line, idx) =>
                    <Fragment key={idx}>{line}<br /></Fragment>)
                  }
                </div>
                i</div>

              <div class="items-center px-4 py-3">
                <button
                  class="modal-button"
                  onClick$={() => modalVisible.value = false}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
});