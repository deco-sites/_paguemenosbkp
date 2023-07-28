interface Props {
  titleTop?: string;
  titleBottom?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function HeaderSections(props: Props) {
  return (
    <>
      {props.titleTop || props.description
        ? (
          <div
            class={`flex flex-col ${
              props.alignment === "left" ? "justify-start" : "justify-center"
            } border-b border-b-[#dadedc]`}
          >
            {props.titleTop &&
              (
                <h1
                  class={`text-xs leading-2
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-[#ed1d24]"
                  }
                  ${props.fontSize === "Normal" ? "text-xs" : "lg:text-lg"}
                `}
                >
                  {props.titleTop}
                </h1>
              )}
            {props.titleBottom &&
              (
                <h2
                  class={`text-xl leading-2 font-bold pb-2
                ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-[#565656]"
                  }
                ${props.fontSize === "Normal" ? "text-xl" : "lg:text-2xl"}
                `}
                >
                  {props.titleBottom}
                </h2>
              )}
            {props.description &&
              (
                <h2
                  class={`
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-primary-content" : "text-neutral"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default HeaderSections;
