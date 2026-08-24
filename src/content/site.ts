/**
 * All of the site's words live here.
 *
 * To change the text on the page, edit this file — you should almost never
 * need to open a component to reword something. Components read from here.
 *
 * The site is written as a story, top to bottom: who she is, how she got here
 * chapter by chapter, what the work proved, and what she wants next.
 * Facts are drawn from docs/content/linkedin.md.
 */

export const site = {
  name: "Alysa Snell",
  /** The name is set as artwork in the hero and footer, so it's split in two. */
  nameFirst: "Alysa",
  nameLast: "Snell",
  role: "Head of Customer Success & Account Management",
  location: "American Fork, Utah",
  email: "hello@alysasnell.com",
  linkedin: "https://www.linkedin.com/in/alysasnell/",

  /** Small chips sitting above the name in the hero. */
  chips: ["Customer Success", "E-Commerce & SaaS", "Onboarding at scale"],

  /** The promise, in two parts. The second part is set in italic. */
  promise: "I turn onboarding chaos",
  promiseEmphasis: "into retention.",

  intro:
    "For ten years I've been the person customers call when something breaks — and the person who makes sure they don't have to call as often. I build the customer success function itself: onboarding that scales, accounts that trust you, and answers waiting before the question gets asked.",

  /** The line that scrolls across the strip under the hero. */
  marquee: "Onboarding at scale · Account management · Shopify & 3PL · SaaS support · Help centers · Retention",
} as const;

/** Buttons in the hero. */
export const heroActions = {
  primary: "Read my story",
  secondary: "Get in touch",
} as const;

/**
 * Photos. Alysa is sending real images — until then each block shows a labeled
 * placeholder in the right shape and size.
 *
 * To add a real photo: drop the file in `public/` and set `src` to its name,
 * e.g. src: "/portrait.jpg". Nothing else needs to change.
 */
export const photos = {
  portrait: {
    src: "",
    alt: "Alysa Snell",
    caption: "Portrait",
    hint: "Tall · head and shoulders",
  },
  storyTall: {
    src: "",
    alt: "Alysa Snell at work",
    caption: "At work",
    hint: "Tall · desk or warehouse",
  },
  storyWide: {
    src: "",
    alt: "A detail from Alysa's work",
    caption: "A detail",
    hint: "Wide · close-up",
  },
  closing: {
    src: "",
    alt: "Alysa Snell",
    caption: "Anything you like",
    hint: "Wide · relaxed",
  },
} as const;

/** The numbers are the portfolio. Lead with them. */
export const stats: ReadonlyArray<{ value: string; label: string }> = [
  { value: "60+", label: "boutique customers onboarded every month" },
  { value: "1,200+", label: "Shopify store owners supported" },
  { value: "90 users", label: "migrated to a new API in 30 days, zero downtime" },
  { value: "40+", label: "help center articles written and maintained" },
];

/**
 * The story, chapter by chapter — this is the heart of the site.
 * It's meant to be read straight through, not scanned.
 */
export const chapters: ReadonlyArray<{
  year: string;
  place: string;
  title: string;
  titleEmphasis: string;
  body: string;
}> = [
  {
    year: "2014",
    place: "Kohl's · Orem, Utah",
    title: "It started on a",
    titleEmphasis: "sales floor.",
    body: "I supervised a department in a big-box store — merchandising, inventory, store layout, and a team that had to hit sales targets and service goals at the same time. It's where I learned that good service isn't a personality trait. It's a system: the right information, in the right place, before anyone has to ask for it.",
  },
  {
    year: "2015",
    place: "Tech Force National · Orem, Utah",
    title: "Then fifty technicians and a",
    titleEmphasis: "scheduling problem.",
    body: "I moved into senior quality control, leading 50+ field technicians spread across the map. Nobody was ever in the same room. The only thing keeping the work on time and up to standard was process — so I rebuilt scheduling, service delivery, and quality control until it held.",
  },
  {
    year: "2017",
    place: "DM Fashion · Lindon, Utah",
    title: "I fell for e-commerce",
    titleEmphasis: "running a warehouse.",
    body: "Operations manager for a retail store and the warehouse attached to it — the team, the daily shipping, and a full reorganization every year before the swim shipment landed. Boxes, deadlines, and a lot of very real customers waiting on the other end of them.",
  },
  {
    year: "2019",
    place: "DM Fashion · Lindon, Utah",
    title: "So I taught myself",
    titleEmphasis: "to build it.",
    body: "As COO I taught myself Shopify — products, apps, workflows — and managed a full site redesign. I worked alongside two marketing agencies, designed and launched a second retail location, and handled every wholesale relationship we had. Nobody handed me a manual for any of it, which turned out to be the useful part.",
  },
  {
    year: "2021",
    place: "Avenue Shops · Remote",
    title: "Now I build the",
    titleEmphasis: "function itself.",
    body: "I was hired to run accounts and ended up building the 3PL account management function from the ground up — no template, no formal training. I'm the single point of contact for a portfolio spanning WMS, Shopify setup, inventory, order routing, and fulfillment. On the SaaS side I lead a small support team, onboard 60+ boutique owners a month over live webinars, and support more than 1,200 Shopify-integrated stores.",
  },
  {
    year: "Next",
    place: "Remote, or hybrid in Utah",
    title: "And what I want",
    titleEmphasis: "to do next.",
    body: "A Head of Customer Success or Director-level role in e-commerce or SaaS — somewhere the function still needs building, or needs someone who'll take it personally. I'd rather inherit a mess I can fix than a machine I only have to keep running.",
  },
];

/** How she works — three things she believes, stated plainly. */
export const principles: ReadonlyArray<{ number: string; title: string; body: string }> = [
  {
    number: "01",
    title: "Onboarding has to scale",
    body: "Sixty new customers a month can't each get a hand-built launch. It has to be repeatable — and it has to feel personal anyway. Both. That's the job.",
  },
  {
    number: "02",
    title: "Answer it before they ask",
    body: "Every question that comes up twice is a documentation problem wearing a support ticket. That's why I wrote the help center, and why I keep writing it.",
  },
  {
    number: "03",
    title: "Be the person they call",
    body: "When routing breaks or an integration goes sideways, an account doesn't need a queue. It needs someone who already knows their setup by heart.",
  },
];

/** Career history, most recent first — the scannable version. */
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
  {
    company: "Kohl's Department Stores",
    title: "Department Supervisor",
    period: "Jul 2014 — Oct 2015",
    location: "Orem, Utah",
    summary: "Led a team past its sales and service goals while managing merchandising, inventory, and store layout.",
  },
];

/** Things she built that someone can go click on. */
export const work: ReadonlyArray<{ title: string; description: string; href?: string; meta: string }> = [
  {
    title: "Ave Shops Help Center",
    meta: "Written and maintained solo",
    description:
      "A 40+ article customer help center covering onboarding, Shopify integrations, and shipping — built so store owners can answer their own question instead of waiting in a ticket queue.",
    href: "https://help.theavenueshops.com/en/",
  },
  {
    title: "CommentSold API migration",
    meta: "90 users · 30 days · zero downtime",
    description:
      "Partnered with our developer and the CommentSold engineering team to move ninety users onto a new integration in under a month, without a single service disruption.",
  },
];

/** The closing invitation. */
export const contact = {
  eyebrow: "Say hello",
  title: "Let's talk about",
  titleEmphasis: "what you're building.",
  body: "I'm looking for Head of Customer Success or Director-level CS and account management roles in e-commerce or SaaS — remote, or hybrid in Utah. If that's the person you need, I'd love to hear about it.",
} as const;
