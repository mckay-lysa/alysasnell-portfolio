/**
 * A photo block.
 *
 * Alysa is sending real images. Until a block has a `src` in
 * src/content/site.ts it shows a labeled placeholder in exactly the shape and
 * size the real photo will occupy — so the layout you see now is the layout
 * you'll get once the photos land.
 */

interface PhotoBlock {
  /** Empty until the real image exists. e.g. "/portrait.jpg" */
  src: string;
  alt: string;
  /** Shown on the placeholder — what this photo is. */
  caption: string;
  /** Shown on the placeholder — the shape it wants. */
  hint: string;
}

interface PhotoProps {
  photo: PhotoBlock;
  /** Aspect ratio and width utilities, e.g. "aspect-[4/5] max-w-sm". */
  className?: string;
  /** A slight editorial tilt, applied from the small breakpoint up. */
  tilt?: "none" | "left" | "right";
}

const TILTS: Record<NonNullable<PhotoProps["tilt"]>, string> = {
  none: "",
  left: "sm:-rotate-2",
  right: "sm:rotate-2",
};

export default function Photo({ photo, className = "", tilt = "none" }: PhotoProps) {
  return (
    <figure
      className={`overflow-hidden rounded-photo border border-as-photo-edge bg-as-photo shadow-[var(--as-card-shadow)] ${TILTS[tilt]} ${className}`}
    >
      {photo.src ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            aria-hidden="true"
            className="h-7 w-7 text-as-ink-faint"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <circle cx="8.75" cy="10" r="1.4" />
            <path d="M3.5 16.5 9 12l4 3.2 3-2.2 4.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption className="text-xs font-semibold tracking-[0.18em] text-as-ink-mute uppercase">
            {photo.caption}
          </figcaption>
          <p className="text-xs text-as-ink-mute">{photo.hint}</p>
        </div>
      )}
    </figure>
  );
}
