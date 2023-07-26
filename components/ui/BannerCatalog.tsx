import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  mobile: LiveImage;
  desktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label?: string;
  };
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: 1 | 2 | 3;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
};

const DESKTOP_COLUMNS = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannerCatalog({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class="container w-full px-4 md:px-0 mx-auto">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-lg leading-5 font-semibold uppercase">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )}
      <div
        class={`grid gap-4 md:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine]
        } md:grid-rows-none ${DESKTOP_COLUMNS[itemsPerLine]}`}
      >
        {banners.map(({ action, mobile, desktop, alt }) => {
          console.log(itemsPerLine, "AQUI");
          return (
            <a
              href={action?.href ?? "#"}
              class={`overflow-hidden ${
                RADIUS_MOBILE[borderRadius.mobile ?? "none"]
              } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={mobile}
                  width={360}
                  height={100}
                />
                <Source
                  media="(min-width: 768px)"
                  src={desktop ? desktop : mobile}
                  width={360}
                  height={100}
                />
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={mobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </a>
          );
        })}
      </div>
    </section>
  );
}
