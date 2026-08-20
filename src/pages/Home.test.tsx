import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";
import { site, stats } from "../content/site";

describe("Home", () => {
  it("renders her name as the page heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.name);
  });

  it("shows every stat from the content file", () => {
    render(<Home />);
    for (const stat of stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("links to her email and LinkedIn", () => {
    render(<Home />);
    expect(screen.getAllByRole("link", { name: /linkedin/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: site.email }).length).toBeGreaterThan(0);
  });
});
