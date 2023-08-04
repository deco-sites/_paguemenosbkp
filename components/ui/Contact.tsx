import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
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
  items?: Array<{ title: string; description: string; link: string }>;
  IconImage?: LiveImage;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      borderRadius: BorderRadius;
      alignmentImage?: "Right" | "Left";
      orientation?: "Row" | "Column" | "Row/Column";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  items: [
    {
      title: "Fale com a Pague Menos",
      description: "Conheça nossos Telefones",
      link: "#",
    },
    {
      title: "Televendas",
      description: "4002-8282",
      link: "#",
    },
    {
      title: "Atendimento ao cliente",
      description: "0800 275 1313",
      link: "#",
    },
    {
      title: "Horário do SAC das 7:00 às 23:00",
      description: "sac@menos.com.br",
      link: "#",
    },
  ],
  layout: {
    headerFontSize: "Large",
    content: {
      borderRadius: "md",
      alignmentImage: "Left",
      orientation: "Row/Column",
      bgColor: "Normal",
    },
  },
};

export default function Contact(props: Props) {
  const { items, layout, IconImage } = { ...DEFAULT_PROPS, ...props };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const orientation = layout?.content?.orientation;
  const borderRadius = layout?.content?.borderRadius;

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-[#f4f4f4]";

  return (
    <div class={`bg-white p-4 lg:p-8`}>
      {layout?.content?.alignmentImage === "Left"
        ? (
          <div
            class={` relative ${!isReverse ? "text-white" : ""} flex ${
              orientation === "Column"
                ? "flex-col"
                : orientation === "Row/Column"
                ? "flex-col md:flex-row md:justify-around"
                : "flex-row md:justify-around"
            }
          ${
              borderRadius && `rounded-${borderRadius}`
            } p-4 gap-4 md:py-16 md:px-4 md:gap-6 ${bgLayout} `}
          >
            {items?.map(({ title, description, link }) => (
              <div>
                <h3 class="text-xs text-black">{title}</h3>
                <a
                  class="font-bolds text-[#0054A6] text-base no-underline"
                  href={link}
                >
                  {description}
                </a>
              </div>
            ))}
            <div>
              <figure>
                <Image
                  class="absolute right-0 bottom-0"
                  src={IconImage ? IconImage : ""}
                  alt="Icon Image"
                  width={70}
                  height={155}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        )
        : (
          <div
            class={`relative${!isReverse ? "text-white" : ""} flex ${
              orientation === "Column"
                ? "flex-col"
                : orientation === "Row/Column"
                ? "flex-col md:flex-row md:justify-around"
                : "flex-row md:justify-around"
            }
          ${
              borderRadius && `rounded-${borderRadius}`
            } p-4 gap-4 md:py-16 md:px-4 md:gap-6 ${bgLayout}`}
          >
            <div>
              <figure>
                <Image
                  class="absolute left-0 bottom-0"
                  src={IconImage ? IconImage : ""}
                  alt="Icon Image"
                  width={70}
                  height={155}
                  loading="lazy"
                />
              </figure>
            </div>
            <div>
              {items?.map(({ title, description, link }) => (
                <div>
                  <h3 class="text-xs text-black">{title}</h3>
                  <a class="text-[#0054A6] text-base no-underline" href={link}>
                    {description}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
