import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import BannerCatalog from "$store/components/ui/BannerCatalog.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label?: string;
  };
}

const GRID_ROWS_MOBILE = {
  2: "grid-rows-[4fr_1fr_4fr]",
  3: "grid-rows-[5fr_1fr_5fr]",
};

const GRID_ROWS_DESKTOP = {
  2: "xl:grid-rows-[60px_1fr_60px] lg:grid-rows-[50px_1fr_50px] md:grid-rows-[35px_1fr_35px]",
  3: "xl:grid-rows-[25px_1fr_25px] lg:grid-rows-[20px_1fr_20px] md:grid-rows-[15px_1fr_15px]",
};

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

interface CarrouselProps {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  interval?: number;
}

export interface Props {
  images: Banner[];
  preload?: boolean;
  interval?: number;
  itemsPerLine: 2 | 3;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
}

function groupBanners(images: Banner[], itemsPerLine: number) {
  // deno-lint-ignore no-explicit-any
  let groupBannerList: Banner[] | Banner | any = [];
  const itemsPerLineParam = itemsPerLine;
  for (let index = 0; index < images?.length; index += itemsPerLineParam) {
    switch (itemsPerLineParam) {
      case 2:
        groupBannerList = [...groupBannerList, [
          images[index],
          images[index + 1],
        ]];
        break;

      case 3:
        groupBannerList = [...groupBannerList, [
          images[index],
          images[index + 1],
          images[index + 2],
        ]];
        break;

      default:
        break;
    }
  }
  return groupBannerList;
}

function Dots({ images, interval = 0 }: CarrouselProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="hidden md:block z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn z-50 rounded-full w-10 h-10 min-h-min md:min-h-min xl:min-h-min md:w-12 md:h-12 xl:btn-lg btn-circle bg-white border border[#0054A6] divide-solid">
          <Icon
            class="text-[#0054A6] bg-white"
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="hidden md:block z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn z-50 rounded-full w-10 h-10 min-h-min md:min-h-min xl:min-h-min md:w-12 md:h-12 xl:btn-lg btn-circle bg-white border border[#0054A6] divide-solid">
          <Icon
            class="text-[#0054A6] bg-white"
            size={25}
            id="ChevronRight"
            strokeWidth={10}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCatalogCarousel(
  { images, interval, itemsPerLine, borderRadius, preload }: Props,
) {
  const id = useId();
  const groupBannerList = groupBanners(images, itemsPerLine);
  return (
    <section className="py-10">
      <div
        id={id}
        className={`px-2 h-max relative grid w-full grid-cols-[42px_1fr_42px] md:grid-cols-[45px_1fr_47px] ${
          GRID_ROWS_DESKTOP[itemsPerLine]
        } ${GRID_ROWS_MOBILE[itemsPerLine]}`}
      >
        <Slider class="carousel carousel-center w-full scrollbar-none gap-6 col-span-full row-span-full h-max">
          {groupBannerList.map((groupBanner: Banner[], index: number) => (
            <Slider.Item index={index} class="carousel-item w-full h-max">
              <BannerCatalog
                banners={groupBanner}
                borderRadius={borderRadius}
                itemsPerLine={itemsPerLine}
                preload={preload}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Buttons />

        {/* <Dots images={groupBannerList} interval={interval} /> */}

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </section>
  );
}

export default BannerCatalogCarousel;
