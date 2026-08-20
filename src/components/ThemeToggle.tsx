import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Flips the palette in theme.css by swapping [data-theme] on <html>. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("as-theme", theme);
    } catch {
      // Private browsing can block writes — the toggle still works this session.
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed top-4 right-4 z-50 rounded-full border border-as-rule bg-as-card px-3 py-1.5 text-xs font-semibold text-as-ink-dim shadow-sm transition-colors hover:text-as-accent"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
