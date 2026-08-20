/**
 * All of the site's words live here.
 *
 * To change the text on the page, edit this file — you should almost never
 * need to open a component to reword something. Components read from here.
 *
 * Content is drawn from docs/content/linkedin.md. Alysa will rewrite this in
 * her own voice; treat the current copy as a starting draft, not final.
 */

export const site = {
  name: "Alysa Snell",
  role: "Head of Customer Success & Account Management",
  location: "American Fork, Utah",
  tagline: "I help e-commerce and SaaS companies turn onboarding chaos into retention.",
  intro:
    "I build the customer-success function from the ground up — onboarding that scales without a support-ticket avalanche, account management that clients actually trust, and help centers that answer the question before it's asked.",
  email: "hello@alysasnell.com",
  linkedin: "https://www.linkedin.com/in/alysasnell/",
} as const;

/** The numbers are the portfolio. Lead with them. */
export const stats: ReadonlyArray<{ value: string; label: string }> = [
  { value: "60+", label: "boutique customers onboarded every month" },
  { value: "1,200+", label: "Shopify store owners supported" },
  { value: "90 users", label: "migrated to a new API in under 30 days, zero downtime" },
  { value: "40+", label: "help center articles written and maintained" },
];

/** Career history, most recent first. */
export const experience: ReadonlyArray<{
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
}> = [
  {
    company: "Avenue Shops",
    title: "Head of Customer Success & Account Management",
    period: "Apr 2021 — Present",
    location: "Lindon, Utah · Remote",
    summary:
      "Built the 3PL account management function from scratch and lead the SaaS support team — onboarding, Shopify integrations, inventory, order routing, and fulfillment.",
  },
  {
    company: "DM Fashion",
    title: "Chief Operations Officer",
    period: "Aug 2019 — Apr 2021",
    location: "Lindon, Utah",
    summary:
      "Ran store operations and a full Shopify site redesign, launched a new retail location, and managed all wholesale relationships.",
  },
  {
    company: "DM Fashion",
    title: "Operations Manager",
    period: "Apr 2017 — Jul 2019",
    location: "Lindon, Utah",
    summary: "Managed the retail store and attached warehouse, including staffing and daily shipping operations.",
  },
  {
    company: "Tech Force National",
    title: "Senior Quality Control",
    period: "Jul 2015 — Jan 2017",
    location: "Orem, Utah",
    summary: "Led 50+ field technicians and improved scheduling, service delivery, and quality-control processes.",
  },
];

/** Things she built that someone can go click on. */
export const work: ReadonlyArray<{ title: string; description: string; href?: string }> = [
  {
    title: "Ave Shops Help Center",
    description:
      "A 40+ article customer help center built and maintained solo, covering onboarding, Shopify integrations, and shipping.",
    href: "https://help.theavenueshops.com/en/",
  },
  {
    title: "CommentSold API migration",
    description:
      "Partnered with engineering to move 90 users onto a new integration in under 30 days with zero service disruption.",
  },
];
