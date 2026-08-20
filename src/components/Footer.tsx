import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="border-t border-as-rule">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-10 text-sm text-as-ink-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-as-accent">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-as-accent">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
