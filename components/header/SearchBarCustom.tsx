import { lazy, Suspense } from "preact/compat";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

function SearchbarCustom({ searchbar }: Props) {
  return (
    <div
      class={`
        block w-full bg-base-100`}
      // style={{ marginTop: headerHeight }}s
    >
      <Suspense fallback={<span class="loading loading-ring" />}>
        <LazySearchbar {...searchbar} variant="desktop" />
      </Suspense>
    </div>
  );
}

export default SearchbarCustom;
