import { heroActions, photos, site } from "../content/site";
import Photo from "./Photo";

export default function Hero() {
  return (
    <header className="bg-as-bg">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <ul className="flex flex-wrap gap-2">
              {site.chips.map(chip => (
                <li
                  key={chip}
                  className="rounded-full border border-as-rule-strong px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.12em] text-as-ink-dim uppercase sm:px-3.5 sm:text-[0.7rem] sm:tracking-[0.14em]"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <h1 className="mt-8 text-[3.25rem] leading-[0.92] tracking-tight text-as-ink sm:text-8xl">
              {site.nameFirst} <em className="block italic text-as-accent">{site.nameLast}</em>
            </h1>

            <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.22em] text-as-ink-mute uppercase">{site.role}</p>

            <p className="mt-8 font-display text-2xl leading-snug text-as-ink sm:text-3xl">
              {site.promise} <em className="italic text-as-highlight">{site.promiseEmphasis}</em>
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-as-ink-dim">{site.intro}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#story"
                className="rounded-full bg-as-accent px-6 py-3 text-sm font-semibold text-as-on-accent transition-colors hover:bg-as-accent-deep"
              >
                {heroActions.primary}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-as-rule-strong px-6 py-3 text-sm font-semibold text-as-ink transition-colors hover:bg-as-accent-soft"
              >
                {heroActions.secondary}
              </a>
            </div>
          </div>

          <Photo photo={photos.portrait} className="aspect-[4/5] w-full lg:mt-0" />
        </div>
      </div>
    </header>
  );
}
