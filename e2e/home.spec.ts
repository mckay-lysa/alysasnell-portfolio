import { expect, test } from "@playwright/test";

// These run against a real production build. If the bundle is broken, an asset
// is missing, or the page renders blank, these fail — which is exactly the
// class of problem a unit test will happily miss.

test("the page loads and shows her name", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Alysa Snell");
});

test("all the main sections are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("the theme toggle switches the palette", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");

  await page.getByRole("button", { name: /switch to (light|dark) mode/i }).click();

  await expect(html).not.toHaveAttribute("data-theme", before ?? "light");
});

test("nothing is logged to the console and no request fails", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", msg => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });
  page.on("requestfailed", req => {
    problems.push(`request failed: ${req.url()}`);
  });

  await page.goto("/", { waitUntil: "networkidle" });
  expect(problems).toEqual([]);
});

test("the layout does not scroll sideways on a phone", async ({ page }) => {
  await page.goto("/");
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflows).toBe(false);
});
