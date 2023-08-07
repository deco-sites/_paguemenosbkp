import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

function LoginButton({ width, height }) {
  const { displayLogin } = useUI();

  return (
    <Button
      class="btn btn-circle btn-ghost"
      aria-label="search icon button"
      onClick={() => {
        displayLogin.value = !displayLogin.peek();
      }}
    >
      <Icon id="Login" width={width ?? 40} height={height ?? 40} strokeWidth={2} />
    </Button>
  );
}

function LocationButton({ width, height }) {
  const { displayLocation } = useUI();

  return (
    <Button
      class="btn btn-circle btn-ghost"
      aria-label="search icon button"
      onClick={() => {
        displayLocation.value = !displayLocation.peek();
      }}
    >
      <Icon id="Location" width={width ?? 40} height={height ?? 40} strokeWidth={2} />
    </Button>
  );
}

function SearchButton({ width, height }) {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn btn-circle btn-ghost"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={width ?? 20} height={height ?? 20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton({ width, height }) {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={width ?? 20} height={height ?? 20} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton({ width, height }) {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn btn-circle btn-ghost relative"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item badge badge-secondary badge-sm">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        {!loading.value && (
          <Icon id="ShoppingCart" width={width ?? 40} height={height ?? 40} strokeWidth={4} />
        )}
      </div>
    </Button>
  );
}

function Buttons({ variant, width = 40, height = 40 }: { variant: "cart" | "search" | "menu" | "login" | "location", width: number, height: number }) {
  if (variant === "cart") {
    return <CartButton width={width} height={height} />;
  }

  if (variant === "search") {
    return <SearchButton width={width} height={height} />;
  }

  if (variant === "menu") {
    return <MenuButton width={width} height={height} />;
  }

  if (variant === "Login") {
    return <LoginButton width={width} height={height} />;
  }

  if (variant === "Location") {
    return <LocationButton width={width} height={height} />;
  }

  return null;
}

export default Buttons;
