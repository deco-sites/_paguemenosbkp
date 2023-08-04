import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import HeaderSections from "$store/components/ui/SectionHeader2.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: LiveImage;
  srcDesktop: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
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
  header?: {
    titleTop?: string;
    titleBottom?: string;
    description?: string;
  };
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 0 */
    mobile?: 0 | 1 | 2 | 3;
    /** @default 4 */
    desktop?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  };
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
  isMainBanner?: false | true;
  preload?: boolean;
}

const MOBILE_COLUMNS = {
  0: "grid-cols-0",
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

const DESKTOP_COLUMNS = {
  0: "sm:grid-cols-0",
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
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

export default function BannerGrid({
  header,
  itemsPerLine,
  borderRadius,
  banners = [],
  isMainBanner = false,
  preload,
}: Props) {
  return (
    <section class="container w-full px-4 pt-6 pb-2 md:px-0 mx-auto overflow-x-auto md:overflow-visible">
      <HeaderSections
        titleTop={header?.titleTop}
        titleBottom={header?.titleBottom}
        description={header?.description || ""}
        alignment={"left"}
      />
      <div
        style={isMainBanner
          ? {
            gridTemplateColumns: `2fr repeat(${
              itemsPerLine?.desktop as number - 1
            }, 1fr)`,
          }
          : {
            gridTemplateColumns: `repeat(${itemsPerLine
              ?.desktop as number}, 1fr)`,
          }}
        class={`${
          !itemsPerLine?.mobile && "hidden"
        } mt-4 flex md:grid min-w-fit w-[${
          banners.length * 186
        }px] md:w-auto gap-0 md:gap-2 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt }, index) => (
          <a
            href={href}
            class={`overflow-hidden w-full first:mr-2 last:ml-2 ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture preload={index === 0 && preload}>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={isMainBanner
                  ? (
                    index === 0 ? 100 : 140
                  )
                  : (
                    93
                  )}
                height={isMainBanner ? 200 : 110}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop}
                width={isMainBanner
                  ? (
                    index === 0 ? 210 : 104
                  )
                  : (
                    201
                  )}
                height={isMainBanner ? 150 : 110}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        ))}
      </div>
    </section>
  );
}
