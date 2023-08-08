import Image from "deco-sites/std/components/Image.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { navbarHeight } from "./constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { IconsLinks } from "$store/components/header/Header.tsx";

export default function TopHeader({
  logo,
  searchbar,
  IconsLinks,
}: {
  searchbar: SearchbarProps;
  IconsLinks?: IconsLinks[];
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ minHeight: navbarHeight }}
        className="md:hidden h-20 flex flex-col bg-base-100 fixed w-full z-50"
      >
        <div className="flex justify-between items-center">
          <Buttons variant="menu" width={30} height={30} />
          {logo && (
            <a
              href="/"
              class="flex-grow flex justify-center items-center pl-4"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={126} height={16} />
            </a>
          )}
          <div class="text-[#0054A6]">
            <Buttons variant="search" width={30} height={30} />
          </div>
          {IconsLinks?.length
            ? IconsLinks.map(({
              width,
              height,
              label,
              href,
              icon,
              alignment,
              isRenderInMobile,
            }) =>
              isRenderInMobile != false && (
                <a
                  class={`flex ${
                    alignment !== "ICON | LABEL"
                      ? "flex-row-reverse"
                      : "flex-row"
                  } py-3`}
                  href={href}
                >
                  <div class="btn btn-circle text-[#0054A6] p-1">
                    {icon === "cart"
                      ? (
                        <Buttons
                          variant={icon}
                          width={30}
                          height={30}
                        />
                      )
                      : (
                        <Icon
                          id={icon}
                          width={30}
                          height={30}
                          strokeWidth={1}
                        />
                      )}
                  </div>
                </a>
              )
            )
            : ""}
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex bg-base-100 fixed w-full z-50 items-center">
        <div className="flex w-full items-start pt-5">
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center pl-4"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={126} height={16} />
            </a>
          )}
          <div className="w-full">
            <Buttons variant="search" width={30} height={30} />
            <Searchbar searchbar={searchbar} />
          </div>
          {IconsLinks?.length
            ? IconsLinks.map(({
              width,
              height,
              label,
              href,
              icon,
              alignment,
              handleType,
            }) => // handleType === "Modal" &&
            (
              <a
                class={`flex items-center ${
                  alignment !== "ICON | LABEL"
                    ? "flex-row-reverse justify-between"
                    : "flex-row justify-between"
                } py-3`}
                href={href}
              >
                <div class="btn btn-circle text-[#0054A6] bg-[#f4f4f4] p-1 flex items-center">
                  {icon === "cart"
                    ? (
                      <Buttons
                        variant={icon}
                        width={width ?? 40}
                        height={height ?? 40}
                      />
                    )
                    : (
                      <Icon
                        id={icon}
                        width={width ?? 40}
                        height={height ?? 40}
                        strokeWidth={1}
                      />
                    )}
                </div>
                <p class="mx-3 text-sm">{label ?? ""}</p>
              </a>
            ))
            : ""}
        </div>
      </div>
    </>
  );
}
