import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import Navbar from "./Navbar.tsx";
import TopHeader from "./TopHeader.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface IconsLinks {
  handleType?: "Link";
  label?: string;
  href?: string;
  icon: "User" | "cart" | "Location";
  /**
   * @title Icon Width
   * @description Icon Width in desktop, Width of Mobile is multiply width * 0.75
   */
  width?: number;
  /**
   * @title Icon Height
   * @description Icon Height in desktop, Height of Mobile is multiply height * 0.75
   */
  height?: number;
  alignment?: "ICON | LABEL" | "LABEL | ICON";
  isRenderInMobile?: false | true;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  IconsLinks?: IconsLinks[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: Image; alt: string };
}

function Header({
  alerts,
  IconsLinks,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header className="pb-20 h-16 md:h-36">
        <div class="bg-base-100 sticky w-full z-50">
          <TopHeader
            searchbar={searchbar}
            logo={logo}
            IconsLinks={IconsLinks}
          />
        </div>
        <div class="bg-base-100 w-full z-40 md:pt-24 absolute">
          <Navbar items={navItems} />
        </div>
        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
