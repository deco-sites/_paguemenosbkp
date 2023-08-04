import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import HeaderSections from "$store/components/ui/SectionHeader2.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  titleTop?: string;
  titleBottom?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  titleTop,
  titleBottom,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 px-4 md:px-0 flex flex-col gap-4 lg:gap-6 lg:py-10">
      <HeaderSections
        titleTop={titleTop}
        titleBottom={titleBottom}
        description={description || ""}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="xl:max-w-screen-2xl grid grid-cols-[35px_1fr_35px]"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-2 col-span-full row-start-1 row-end-7 p-2">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item"
            >
              <ProductCard
                product={product}
                itemListName={`${titleTop} ${titleBottom}`}
                layout={cardLayout}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: `${titleTop} ${titleBottom}`,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
