import Icon from "$store/components/ui/Icon.tsx";

export interface CertifiedItem {
  label: "ReclameAqui";
  link: string;
}

export default function Certified(
  { content, vertical = false }: {
    content?: { title?: string; items?: CertifiedItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <h3 class="text-lg">{content.title}</h3>}
          <ul
            class={`flex gap-4 ${
              vertical
                ? "lg:flex-col items-start justify-center"
                : "flex-wrap items-center justify-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block p-1 border rounded-full">
                      <Icon
                        width={110}
                        height={50}
                        id={item.label}
                      />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
