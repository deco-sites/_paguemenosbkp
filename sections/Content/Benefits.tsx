import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description: string;
  }>;
  layout?: {
    variation?:
      | "Simple"
      | "With border"
      | "Color reverse"
      | "Background Degrade";
    headerAlignment?: "center" | "left";
    orientation: "Vertical" | "Horizontal";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content p-4 lg:py-4" : ""
        } flex gap-2 lg:gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${showDivider ? "pb-4 lg:pr-6 lg:border-r lg:border-b-0" : ""} ${
          showDivider && !reverse ? "lg:pb-0" : ""
        }`}
      >
        <div class="flex-none">
          <Icon
            id={benefit.icon}
            class={reverse ? "text-base-100" : "text-[#007DC5]"}
            width={43}
            height={40}
            strokeWidth={15}
            fill="#007DC5"
          />
        </div>
        <div
          class={`flex-auto flex flex-col gap-1 ${
            layout?.orientation === "Horizontal"
              ? "w-max pr-2 lg:w-auto lg:pr-0"
              : ""
          }`}
        >
          <div
            class={`text-sm leading-7 font-bold ${
              reverse ? "text-base-100" : "text-base-content"
            }`}
          >
            {benefit.label}
          </div>
          <p
            class={`text-sm leading-5 ${
              reverse ? "text-base-100" : "text-neutral"
            } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center overflow-x-auto max-w-[100%] lg:overflow-x-visible">
              <div
                class={`flex gap-4 w-full lg:grid grid-flow-col auto-cols-fr ${
                  layout?.orientation === "Horizontal"
                    ? "flex-row lg:gap-6"
                    : "flex-col lg:gap-8"
                }`}
              >
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div
              class={`${
                layout?.orientation === "Horizontal"
                  ? "flex flex-row"
                  : "flex flex-col"
              } gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:p-10`}
            >
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div
              class={`${
                layout?.orientation === "Horizontal"
                  ? "flex flex-row"
                  : "flex flex-col"
              } gap-4 w-full lg:gap-8`}
            >
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Background Degrade" && (
        <div
          class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0"
          style={{
            background: "linear-gradient(180deg,#007dc5,#f4f4f4 210px)",
          }}
        >
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div
              class={`${
                layout?.orientation === "Horizontal"
                  ? "flex flex-row"
                  : "flex flex-col"
              } gap-4 w-full lg:gap-8`}
            >
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
