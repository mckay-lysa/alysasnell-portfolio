/**
 * The strip of words that drifts slowly across the page under the hero.
 *
 * It's decoration, so it's hidden from screen readers — the same words appear
 * as real content further down. It holds still for anyone whose device asks
 * for reduced motion.
 */
export default function Marquee({ text }: { text: string }) {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-as-band-rule bg-as-band py-4">
      <div className="flex w-max animate-drift motion-reduce:animate-none">
        {[0, 1].map(copy => (
          <span
            key={copy}
            className="shrink-0 pr-8 text-xs tracking-[0.28em] whitespace-nowrap text-as-band-ink-dim uppercase sm:text-sm"
          >
            {text} ·
          </span>
        ))}
      </div>
    </div>
  );
}
