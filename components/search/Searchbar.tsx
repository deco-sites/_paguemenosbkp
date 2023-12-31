/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { useEffect, useRef } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-ghost btn-circle"
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon id="XMark" width={20} height={20} strokeWidth={2} />
    </Button>
  );
}

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  variant?: "desktop" | "mobile";
};

function Searchbar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  query,
  variant = "mobile",
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div class="w-full flex flex-col p-2 md:py-2 md:px-20">
      <div class="flex items-center gap-4">
        <form
          id="searchbar"
          action={action}
          class="flex-grow flex gap-3 px-3 py-2 border rounded-md border-base-200 focus-within:border-[#0054A6] bg-[#f4f4f4] focus-within:bg-white focus-within:text-[#0054A6] text-base-300"
        >
          <Button
            class="btn-ghost"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
          >
            <Icon
              id="MagnifyingGlass"
              size={20}
              strokeWidth={0.01}
            />
          </Button>
          <input
            ref={searchInputRef}
            id="search-input"
            class="flex-grow outline-none placeholder-shown:sibling:hidden bg-[#f4f4f4] focus-within:bg-white text-[#727273]"
            name={name}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setSearch(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <button
            type="button"
            aria-label="Clean search"
            class="focus:outline-none"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              setSearch("");
            }}
          >
            {searchInputRef?.current?.value?.length
              ? <span class="text-sm">limpar</span>
              : ""}
          </button>
        </form>
        {searchInputRef?.current?.value?.length && variant === "desktop"
          ? <CloseButton />
          : ""}
      </div>
      <div class="flex flex-col gap-6 divide-y divide-base-200 mt-6 empty:mt-0 md:flex-row md:divide-y-0">
        {searchInputRef?.current?.value?.length
          ? notFound
            ? (
              <div class="py-16 md:py-6! flex flex-col gap-4 w-full">
                <span
                  class="font-medium text-xl text-center"
                  role="heading"
                  aria-level={3}
                >
                  Nenhum resultado encontrado
                </span>
                <span class="text-center text-base-300">
                  Vamos tentar de outro jeito? Verifique a ortografia ou use um
                  termo diferente
                </span>
              </div>
            )
            : (
              <>
                <div class="flex flex-col gap-6 md:w-[15.25rem] md:max-w-[15.25rem]\">
                  <div class="flex gap-2 items-center">
                    <span
                      class="font-medium text-xl"
                      role="heading"
                      aria-level={3}
                    >
                      Sugestões
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <ul id="search-suggestion" class="flex flex-col gap-6">
                    {suggestions?.value!.searches?.map(({ term }) => (
                      <li>
                        <a
                          href={`/s?q=${term}`}
                          class="flex gap-4 items-center"
                        >
                          <span>
                            <Icon
                              id="MagnifyingGlass"
                              size={20}
                              strokeWidth={0.01}
                            />
                          </span>
                          <span>
                            {term}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
                  <div class="flex gap-2 items-center">
                    <span
                      class="font-medium text-xl"
                      role="heading"
                      aria-level={3}
                    >
                      Produtos sugeridos
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <Slider class="carousel">
                    {suggestions.value!.products?.map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item first:ml-4 last:mr-4 min-w-[240px] max-w-[240px]"
                      >
                        <ProductCard product={product} />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              </>
            )
          : ""}
      </div>
    </div>
  );
}

export default Searchbar;
