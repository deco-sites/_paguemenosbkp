interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function HeaderSections(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-xs leading-8 lg:leading-10 text-[#ed1d24]
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-base" : "lg:text-lg"}
                `}
                >
                  {props.title}
                </h1>
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
