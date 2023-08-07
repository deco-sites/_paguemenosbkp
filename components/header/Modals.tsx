import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";
import { useRef } from "preact/hooks";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
}

function Modals({ menu, searchbar }: Props) {
  const { 
    displayCart,
    displayMenu,
    displaySearchbar,
    // displayLocation,
    // displayLogin
  } = useUI();
  const formInputLogin = useRef<HTMLInputElement>(null)
  const formInputLocation = useRef<HTMLInputElement>(null)

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <Modal
        title="Menu"
        mode="sidebar-left"
        loading="lazy"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      {/* <Modal
        title="Login"
        mode="center"
        loading="lazy"
        open={displayLogin.value}
        onClose={() => {
          displayLogin.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <div class="flex flex-col">
            <h2>Faça Login</h2>
            <form onSubmit={(e) => e.preventDefault()}>
            <input ref={formInputLogin} class="border rounded-md" />
            <button
              type="submit"
            >
              Login
            </button>
            </form>
          </div>
        </Suspense>
      </Modal>

      <Modal
        title="Location"
        mode="center"
        loading="lazy"
        open={displayLocation.value}
        onClose={() => {
          displayLocation.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <div class="flex flex-col">
            <h2>Informe seu CEP para</h2>
            <form onSubmit={(e) => e.preventDefault()}>
            <input ref={formInputLocation} class="border rounded-md" />
            <button
              type="submit"
            >
              
            </button>
            </form>
          </div>
        </Suspense>
      </Modal> */}

      <Modal
        title="Buscar"
        mode="sidebar-right"
        loading="lazy"
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 767px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Searchbar {...searchbar} />
        </Suspense>
      </Modal>

      <Modal
        title="Minha sacola"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
