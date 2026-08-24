import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="bg-as-band">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-col gap-8 border-b border-as-band-rule pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-as-band-ink-mute uppercase">
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block font-display text-2xl text-as-band-ink transition-colors hover:text-as-band-highlight sm:text-3xl"
            >
              {site.email}
            </a>
          </div>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold tracking-[0.14em] text-as-band-ink-dim uppercase transition-colors hover:text-as-band-highlight"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Her name, set as artwork across the bottom of the page. Decorative —
          it's already the page heading up top, so screen readers skip it. */}
      <div aria-hidden="true" className="overflow-hidden px-4 pt-10">
        <p className="text-center font-display text-[15vw] leading-[0.8] tracking-tight whitespace-nowrap text-as-band-ink">
          {site.nameFirst} <em className="italic text-as-band-highlight">{site.nameLast}</em>
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-12 pb-10">
        <p className="text-xs text-as-band-ink-mute">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
