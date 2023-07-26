import Image from "deco-sites/std/components/Image.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { navbarHeight } from "./constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

export default function TopHeader({
  logo,
  searchbar,
}: {
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        className="md:hidden flex flex-col bg-base-100 fixed w-full z-50"
      >
        <div className="flex justify-between items-center">
          <Buttons variant="menu" />
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={126} height={16} />
            </a>
          )}
          <Buttons variant="cart" />
        </div>
        <div className="w-[300px]">
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex bg-base-100 fixed w-full z-50">
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}
        <Buttons variant="search" />
        <div className="lg:w-[300px]">
          <Searchbar searchbar={searchbar} />
          {/* <Searchbar /> */}
        </div>
        <a
          class="btn btn-sm btn-ghost"
          href="/login"
          aria-label="Log in"
        >
          <Icon id="User" width={20} height={20} strokeWidth={0.4} />
        </a>
        {
          /* <a
            class="btn btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a> */
        }

        <Buttons variant="cart" />
      </div>
    </>
  );
}
