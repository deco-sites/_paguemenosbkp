import Header from "$store/components/ui/SectionHeader.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout } = { ...DEFAULT_PROPS, ...props };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={!isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4 w-full">
      <div
        class={`flex ${
          layout?.content?.alignment === "Side to side"
            ? "flex-col md:flex-row w-full"
            : "flex-col gap-3"
        }`}
      >
        <input
          class="input input-bordered w-full bg-[rgba(0,125,197,0.8)] text-white"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`btn bg-[#ffb100] text-[rgba(0,125,197,0.8)] ${
            isReverse ? "btn-accent" : ""
          }`}
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {form?.helpText && form?.helpText?.length > 30 && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-[#0054A6]";

  return (
    <div
      class={`${
        bordered
          ? isReverse ? "bg-secondary-content" : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-8" : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`container ${
            !isReverse ? "text-white" : ""
          } flex flex-col rounded p-4 gap-6 lg:p-8 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`container ${
            !isReverse ? "text-white" : ""
          } flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`container items-center flex-col ${
            !isReverse ? "text-white" : ""
          } flex rounded justify-between lg:flex-row p-4 gap-2 lg:p-5 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center w-full lg:w-[550px]">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}
