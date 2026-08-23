import { Fragment } from "react";
import { chapters, photos } from "../content/site";
import Photo from "./Photo";

/**
 * The story, chapter by chapter — a year down the left, the chapter itself
 * down the right, with photos breaking up the run.
 */
export default function Story() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {chapters.map((chapter, index) => (
        <Fragment key={chapter.year}>
          <article className="grid gap-5 sm:grid-cols-[8rem_1fr] sm:gap-10">
            <div className="sm:pt-1">
              <p className="font-display text-3xl leading-none text-as-highlight sm:text-4xl">{chapter.year}</p>
              <p className="mt-2 text-[0.68rem] tracking-[0.16em] text-as-ink-mute uppercase">{chapter.place}</p>
            </div>

            <div className="border-l border-as-rule pl-6 sm:pl-10">
              <h3 className="text-2xl leading-snug text-as-ink sm:text-[2rem]">
                {chapter.title} <em className="italic text-as-accent">{chapter.titleEmphasis}</em>
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-as-ink-dim">{chapter.body}</p>
            </div>
          </article>

          {index === 1 ? (
            <div className="sm:pl-[9.5rem]">
              <Photo photo={photos.storyTall} tilt="left" className="aspect-[4/5] w-full max-w-xs sm:max-w-sm" />
            </div>
          ) : null}

          {index === 3 ? (
            <div className="sm:pl-[9.5rem]">
              <Photo photo={photos.storyWide} className="aspect-[16/10] w-full" />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
