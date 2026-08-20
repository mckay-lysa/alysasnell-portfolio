// `defineConfig` comes from vitest/config (not vite) so the `test` block below
// is type-checked. It is a superset of Vite's own defineConfig.
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Cloudflare Pages is configured to publish this directory.
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Playwright owns e2e/; Vitest must not try to run those specs.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
