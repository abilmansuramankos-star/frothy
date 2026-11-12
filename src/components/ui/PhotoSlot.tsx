/**
 * Плейсхолдер для фотографий.
 * Замените на реальные снимки: положите файлы в /public/images
 * и используйте next/image.
 */
export function PhotoSlot({
  label,
  ratio = "aspect-[4/5]",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative ${ratio} w-full overflow-hidden border border-line bg-paper ${className}`}
      role="img"
      aria-label={`Место для фотографии: ${label}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(22,35,60,0.04) 10px, rgba(22,35,60,0.04) 11px)",
        }}
      />
      <figcaption className="absolute inset-0 flex items-end p-4">
        <span className="bg-navy/85 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-warmwhite">
          фото · {label}
        </span>
      </figcaption>
    </figure>
  );
}
