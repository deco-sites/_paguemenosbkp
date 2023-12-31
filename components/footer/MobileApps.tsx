export default function MobileApps(
  { content }: { content: { apple?: string; android?: string } },
) {
  return (
    <>
      {(content?.apple || content?.android) && (
        <div class="flex gap-2 lg:flex-wrap items-center justify-center">
          {content?.apple && (
            <a href={content?.apple} target="_blank">
              <img
                width="135"
                height="40"
                alt="Baixe nosso app na Apple Store"
                src="/image/app-apple.png"
              />
            </a>
          )}
          {content?.android && (
            <a href={content?.android} target="_blank">
              <img
                width="135"
                height="40"
                alt="Baixe nosso app na Google Play"
                src="/image/app-android.png"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}
