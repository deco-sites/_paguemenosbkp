import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import HeaderSections from "$store/components/ui/SectionHeader2.tsx";

export interface Banner {
  srcMobile?: LiveImage;
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

export interface Props {
  header?: {
    titleTop?: string;
    titleBottom?: string;
    description?: string;
  };
  banners: {
    bannersTop: Banner[];
    bannersBottom: Banner[];
    bannerRight: Banner;
  };
  preload?: boolean;
}

interface BannerItem extends Banner {
  preload?: boolean;
}

function Banner(
  { href, srcMobile, srcDesktop, alt, preload }: BannerItem,
  index: number,
  key: string,
) {
  let BannerSize = { width: 0, height: 0 };
  if (key === "Large") {
    BannerSize = { width: 334, height: 130 };
  } else if (key === "Short") {
    BannerSize = { width: 135, height: 130 };
  } else {
    BannerSize = { width: 132, height: 261 };
  }
  return (
    <a
      href={href}
      class={`${
        key === "Short"
          ? "w-[20%] h-[49%]"
          : key === "Large"
          ? "w-[59%] h-[49%]"
          : "w-[100%] h-[100%]"
      }
      mx-2
      `}
    >
      <Picture preload={index === 0 && preload}>
        <Source
          media="(max-width: 767px)"
          src={srcMobile ? srcMobile : srcDesktop}
          width={0}
          height={0}
        />
        <Source
          media="(min-width: 768px)"
          src={srcDesktop}
          width={BannerSize.width}
          height={BannerSize.height}
        />
        <img
          class={`${
            key === "Short"
              ? "w-[270px] h-[275px]"
              : key === "Large"
              ? "w-[750px] h-[275px]"
              : "w-[270px] h-[568px]"
          }
          object-cover
          `}
          sizes="(max-width: 640px) 100vw, 30vw"
          src={srcMobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}

export default function BannersMosaic({
  header,
  banners,
  preload = false,
}: Props) {
  return (
    <section class="hidden md:block container w-full mx-auto overflow-x-auto md:overflow-visible">
      <HeaderSections
        titleTop={header?.titleTop}
        titleBottom={header?.titleBottom}
        description={header?.description || ""}
        alignment={"left"}
      />
      <div class="grid grid-cols-8 grid-rows-1 w-full h-[580px]">
        <div class="grid grid-rows-2 grid-cols-1 col-start-1 col-end-7 mr-1">
          <div class="grid grid-cols-8 grid-rows-1 row-start-1 row-end-1 col-start-1 col-end-8">
            {banners?.bannersTop.map((banner: BannerItem, index: number) => {
              return (
                <div
                  class={index === 0
                    ? "col-start-1 col-end-7 mr-2"
                    : "col-start-7 col-end-9 ml-2"}
                >
                  {Banner(
                    { ...banner, preload },
                    index,
                    index === 0 ? "Large" : "Short",
                  )}
                </div>
              );
            })}
          </div>
          <div class="grid grid-cols-8 grid-rows-1 row-start-2 row-end-2 col-start-1 col-end-8">
            {banners?.bannersBottom.map((banner: BannerItem, index: number) => {
              return (
                <div
                  class={index === 0
                    ? "col-start-1 col-end-3 mr-2"
                    : "col-start-3 col-end-9 ml-2"}
                >
                  {Banner(
                    { ...banner, preload },
                    index,
                    index === 0 ? "Short" : "Large",
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div class="grid grid-cols-1 grid-rows-1 col-start-7 col-end-9 pt-[1.4rem]">
          {Banner({ ...banners.bannerRight, preload }, 0, "Long")}
        </div>

        {/* 750 - 256 - 270 > 270 + 256 + 750 = 1276 / 4 =  638 + 127  765- 50%  66%  319 - 256 =  20% 21%*/}
      </div>
    </section>
  );
}
