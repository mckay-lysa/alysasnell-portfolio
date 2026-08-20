import Hero from "../components/Hero";
import Section from "../components/Section";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { experience, site, work } from "../content/site";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <main>
        <Hero />

        <Section id="experience" eyebrow="Career" title="Experience" recessed>
          <ol className="space-y-8">
            {experience.map(role => (
              <li key={`${role.company}-${role.title}`} className="border-l border-as-rule pl-5">
                <h3 className="text-lg font-semibold text-as-ink">{role.title}</h3>
                <p className="mt-0.5 text-sm font-medium text-as-accent">{role.company}</p>
                <p className="mt-0.5 text-sm text-as-ink-mute">
                  {role.period} · {role.location}
                </p>
                <p className="mt-2 text-as-ink-dim">{role.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="work" eyebrow="Selected work" title="Things I've built">
          <div className="grid gap-4 sm:grid-cols-2">
            {work.map(item => (
              <article
                key={item.title}
                className="rounded-card border border-as-card-edge bg-as-card p-5 shadow-[var(--as-card-shadow)]"
              >
                <h3 className="font-semibold text-as-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-as-ink-dim">{item.description}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-as-accent hover:underline"
                  >
                    View it →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Say hello" title="Let's talk" recessed>
          <p className="text-as-ink-dim">
            I'm looking for Head of Customer Success or Director-level CS and account management roles in e-commerce or
            SaaS — remote, or hybrid in Utah.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block rounded-full bg-as-accent px-5 py-2.5 text-sm font-semibold text-as-on-accent transition-colors hover:bg-as-accent-deep"
          >
            {site.email}
          </a>
        </Section>
      </main>
      <Footer />
    </>
  );
}
