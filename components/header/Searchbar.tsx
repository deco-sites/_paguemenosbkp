import { lazy, Suspense } from "preact/compat";

import { useUI } from "$store/sdk/useUI.ts";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value &&
    window?.matchMedia?.("(min-width: 768px)")?.matches;
  return (
    <div
      class={`w-full bg-base-100`}
    >
      {open && (
        <Suspense fallback={<span class="loading loading-ring" />}>
          <LazySearchbar {...searchbar} variant="desktop" />
        </Suspense>
      )}
    </div>
  );
}

export default Searchbar;
