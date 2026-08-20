import { site, stats } from "../content/site";

export default function Hero() {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-24 pb-16 sm:pt-32">
      <p className="text-xs font-semibold tracking-[0.14em] text-as-accent uppercase">{site.role}</p>

      <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-as-ink sm:text-6xl">{site.name}</h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-as-ink-dim sm:text-2xl">{site.tagline}</p>

      <p className="mt-4 max-w-2xl text-as-ink-dim">{site.intro}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-as-accent px-5 py-2.5 text-sm font-semibold text-as-on-accent transition-colors hover:bg-as-accent-deep"
        >
          Get in touch
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-as-rule-strong px-5 py-2.5 text-sm font-semibold text-as-ink transition-colors hover:bg-as-accent-soft"
        >
          LinkedIn
        </a>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map(stat => (
          <div key={stat.label} className="border-l-2 border-as-highlight pl-4">
            <dt className="text-2xl font-semibold text-as-highlight tabular-nums">{stat.value}</dt>
            <dd className="mt-1 text-sm text-as-ink-dim">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
