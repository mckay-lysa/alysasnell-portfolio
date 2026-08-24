import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Photo from "../components/Photo";
import Section from "../components/Section";
import Story from "../components/Story";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { contact, experience, photos, principles, site, stats, work } from "../content/site";

/**
 * The page reads top to bottom as one story: who she is, how she got here,
 * what it added up to, how she works, the short résumé version, the things
 * you can go click on, and an invitation.
 *
 * The grounds alternate — cream, espresso, cream, espresso, sage, beige,
 * cream, sage — so the eye always knows a new chapter started.
 */
export default function Home() {
  return (
    <>
      <ThemeToggle />
      <main>
        <Hero />

        <Marquee text={site.marquee} />

        <Section
          id="story"
          eyebrow="How I got here"
          title="The story"
          titleEmphasis="so far."
          lead="Nobody starts out running customer success. I started on a sales floor, learned operations in a warehouse, taught myself e-commerce because someone had to — and ended up building the function I now lead."
        >
          <Story />
        </Section>

        <Section
          id="numbers"
          tone="band"
          wide
          eyebrow="By the numbers"
          title="What the work"
          titleEmphasis="adds up to."
          lead="These aren't projections or team totals. They're what runs through my hands in a given month."
        >
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="border-t border-as-band-rule pt-6">
                <dt className="font-display text-4xl leading-none text-as-band-highlight tabular-nums sm:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mt-4 text-sm leading-relaxed text-as-band-ink-dim">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="approach" tone="sage" wide eyebrow="How I work" title="Three things I" titleEmphasis="believe.">
          <ol className="grid gap-10 sm:grid-cols-3">
            {principles.map(principle => (
              <li key={principle.number}>
                <p className="font-display text-xl text-as-highlight tabular-nums">{principle.number}</p>
                <h3 className="mt-4 text-xl leading-snug text-as-ink">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-as-ink-dim">{principle.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="experience"
          tone="deep"
          eyebrow="The short version"
          title="Ten years,"
          titleEmphasis="on one page."
        >
          <ol className="space-y-10">
            {experience.map(role => (
              <li key={`${role.company}-${role.period}`} className="border-l border-as-rule pl-6">
                <p className="text-[0.68rem] tracking-[0.16em] text-as-ink-mute uppercase">
                  {role.period} · {role.location}
                </p>
                <h3 className="mt-2 text-xl leading-snug text-as-ink">{role.title}</h3>
                <p className="mt-1 text-sm font-semibold text-as-accent">{role.company}</p>
                <p className="mt-3 leading-relaxed text-as-ink-dim">{role.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="work" wide eyebrow="Selected work" title="Things you can" titleEmphasis="go and look at.">
          <div className="grid gap-6 sm:grid-cols-2">
            {work.map(item => (
              <article
                key={item.title}
                className="flex flex-col rounded-card border border-as-card-edge bg-as-card p-7 shadow-[var(--as-card-shadow)]"
              >
                <p className="text-[0.68rem] tracking-[0.16em] text-as-ink-mute uppercase">{item.meta}</p>
                <h3 className="mt-3 text-2xl leading-snug text-as-ink">{item.title}</h3>
                <p className="mt-4 grow leading-relaxed text-as-ink-dim">{item.description}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block text-sm font-semibold text-as-accent hover:underline"
                  >
                    Go and see it →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          tone="sage"
          wide
          eyebrow={contact.eyebrow}
          title={contact.title}
          titleEmphasis={contact.titleEmphasis}
        >
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-as-ink-dim">{contact.body}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block rounded-full bg-as-accent px-6 py-3 text-sm font-semibold text-as-on-accent transition-colors hover:bg-as-accent-deep"
              >
                {site.email}
              </a>
            </div>

            <Photo photo={photos.closing} tilt="right" className="aspect-[5/4] w-full" />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
