import Image from "deco-sites/std/components/Image.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { navbarHeight } from "./constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { IconsLinks } from "$store/components/header/Header.tsx"

export default function TopHeader({
  logo,
  searchbar,
  IconsLinks,
}: {
  searchbar: SearchbarProps;
  IconsLinks: IconsLinks[]
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
          {/* { IconsLinks?.map(({ la })) } */}
          <Buttons variant="cart" />
        </div>
        <div className="w-[300px]">
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex bg-base-100 fixed w-full z-50 items-center">
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
        <div className="w-full">
          <Searchbar searchbar={searchbar} />
        </div>
        { IconsLinks?.length ? IconsLinks.map(({ 
          width, height, label, href, icon, alignment, handleType }) => handleType != "Modal" && (
            <a
              class={`flex ${alignment !== "ICON | LABEL" ? "flex-row-reverse" : "flex-row"}`}
              href={href}
              >
                <div class="btn btn-circle text-[#0054A6] bg-[#f4f4f4] p-1">
                  <Icon id={icon} width={width ?? 40} height={height ?? 40} strokeWidth={1} />
                  <p>{label ?? ''}</p>
                </div>
              </a>
          )
          // ) : (
          //   <div class={`flex ${alignment !== "ICON | LABEL" ? "flex-row-reverse" : "flex-row"}`}>
          //     <div class="btn btn-circle text-[#0054A6] bg-[#f4f4f4] p-1">
          //       <Buttons variant={icon} width={width} height={height} />
          //     </div>
          //     <p>{label ?? ''}</p>
          //   </div>
          // )
        ) : ""}
      </div>
    </>
  );
}