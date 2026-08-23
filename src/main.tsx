import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts are bundled locally (no Google Fonts request) — see theme.css for the
// font-family tokens that reference them.
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";

import "./styles/index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find the #root element in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
