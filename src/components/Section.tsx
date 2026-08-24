import type { ReactNode } from "react";

/**
 * The four grounds a section can sit on. They alternate down the page to give
 * the story a rhythm — cream, beige, sage, and the deep espresso band.
 * The colors themselves live in src/styles/theme.css.
 */
export type Tone = "paper" | "deep" | "sage" | "band";

const TONES: Record<Tone, { surface: string; heading: string; eyebrow: string; lead: string }> = {
  paper: {
    surface: "bg-as-bg",
    heading: "text-as-ink",
    eyebrow: "text-as-ink-mute",
    lead: "text-as-ink-dim",
  },
  deep: {
    surface: "bg-as-bg-deep",
    heading: "text-as-ink",
    eyebrow: "text-as-ink-mute",
    lead: "text-as-ink-dim",
  },
  sage: {
    surface: "bg-as-bg-sage",
    heading: "text-as-ink",
    eyebrow: "text-as-ink-mute",
    lead: "text-as-ink-dim",
  },
  band: {
    surface: "bg-as-band",
    heading: "text-as-band-ink",
    eyebrow: "text-as-band-ink-mute",
    lead: "text-as-band-ink-dim",
  },
};

interface SectionProps {
  /** Anchor id, used by the links in the hero. */
  id: string;
  /** Small spaced-out label above the heading. */
  eyebrow?: string;
  title: string;
  /** Set in italic straight after the title — the house headline style. */
  titleEmphasis?: string;
  /** One paragraph under the heading, before everything else. */
  lead?: string;
  tone?: Tone;
  /** Wide gives cards and photos room; the default keeps prose readable. */
  wide?: boolean;
  children: ReactNode;
}

/** Shared shell for every page section: ground, width, padding, heading. */
export default function Section({
  id,
  eyebrow,
  title,
  titleEmphasis,
  lead,
  tone = "paper",
  wide = false,
  children,
}: SectionProps) {
  const t = TONES[tone];

  return (
    <section id={id} className={`${t.surface} scroll-mt-2`}>
      <div className={`mx-auto px-6 py-20 sm:py-28 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        {eyebrow ? (
          <p className={`mb-5 text-[0.7rem] font-semibold tracking-[0.22em] uppercase ${t.eyebrow}`}>{eyebrow}</p>
        ) : null}

        <h2 className={`text-[2rem] leading-[1.12] sm:text-5xl ${t.heading}`}>
          {title}
          {titleEmphasis ? <em className="italic"> {titleEmphasis}</em> : null}
        </h2>

        {lead ? <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${t.lead}`}>{lead}</p> : null}

        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
