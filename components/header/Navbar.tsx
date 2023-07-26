import NavItem from "./NavItem.tsx";
import type { INavItem } from "./NavItem.tsx";

function Navbar({ items }: {
  items: INavItem[];
}) {
  return (
    <>
      {/* Mobile Version */}
      <div />

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
