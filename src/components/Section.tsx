import type { ReactNode } from "react";

interface SectionProps {
  /** Anchor id, used by nav links. */
  id: string;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: string;
  children: ReactNode;
  /** Use the recessed background so adjacent sections alternate. */
  recessed?: boolean;
}

/** Shared shell for every page section: consistent width, padding, heading. */
export default function Section({ id, eyebrow, title, children, recessed = false }: SectionProps) {
  return (
    <section id={id} className={recessed ? "bg-as-bg-deep" : undefined}>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-as-ink-mute uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold text-as-ink sm:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
