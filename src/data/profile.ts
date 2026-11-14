import type { Count } from "@/data/writing";

/*
  Hero positioning options. Change `heroIndex` to switch.

  0. "I build valuation models and write essays. Both begin by asking what a thing is actually worth."
  1. "A poet's heart, a philosopher's mind, and a jack-of-all-trades' curiosity."   (my Substack tagline)
  2. "I build deal models and read philosophy, because both are about what survives scrutiny."
*/
export const heroOptions = [
  "I build valuation models and write essays. Both begin by asking what a thing is actually worth.",
  "A poet's heart, a philosopher's mind, and a jack-of-all-trades' curiosity.",
  "I build deal models and read philosophy, because both are about what survives scrutiny.",
];
export const heroIndex = 0;

export const profile = {
  name: "Abhimanyu Patel",
  email: "patelabhimanyu54@gmail.com",
  roleLine:
    "B.Tech Computer Science at IIIT Bhopal. CFA Level 1 candidate, February 2027. Interested in investment banking, private equity, venture capital and consulting.",
  positioning: heroOptions[heroIndex],
  /** Put a file at /public/headshot.jpg and set this to "/headshot.jpg". null hides it. */
  headshot: null as string | null,
  resumeHref: "/Abhimanyu_Patel_Resume.pdf",
  links: {
    github: "https://github.com/Poet-Philosopher",
    linkedin: "https://www.linkedin.com/in/abhimanyu-patel-iiitb",
    substack: "https://thepoeticgeneralist.substack.com/",
  },
  about: [
    "I study computer science at IIIT Bhopal and I am working toward roles in investment banking, private equity, venture capital and consulting. I am registered for the CFA Program and sit Level 1 in February 2027.",
    "Most of what I build starts as a valuation question: what a listed company is worth by comps, DCF and LBO, which public-sector issuer is carrying credit risk, what an option should cost. I write the answer as code and test it until it stops surprising me.",
    "The other half of my work is writing. poet philosopher, my newsletter, covers philosophy, political history and culture, and has 1000+ subscribers. Writing taught me what a model cannot: an argument has to survive a reader who disagrees. A good model and a good essay fail the same way, by hiding their assumptions, so I try to put mine on the page.",
    "I also co-coordinate Shankh, the IIIT Bhopal college magazine.",
  ],
  /**
   * Hero ledger. Left column is computed work, right column is composed work.
   * The key names are kept from an earlier version: banks = companies valued (India Deal Lab case studies),
   * cpse = issuers scored, tests = pytest tests behind the options pricer.
   */
  ledgerFigures: {
    banks: { value: 5 } satisfies Count,
    cpse: { value: 37 } satisfies Count,
    tests: { value: 155 } satisfies Count,
  },
  certificates: [
    {
      title: "Investment Banking Job Simulation, Bank of America (Forage)",
      body: "Certificate of completion for practical tasks in company analysis and SWOT, strategic alternatives, financial modeling, and communicating successfully.",
      year: "Oct 2026",
      href: "/Bank_of_America_IB_Simulation_Certificate.pdf",
    },
  ],
  education: [
    { school: "IIIT Bhopal", detail: "B.Tech, Computer Science & Engineering", score: "7.71 SGPA", note: "Pursuing", years: "2024 to 2028" },
    { school: "Orchid International School", detail: "Class XII (PCMB)", score: "87.2%", note: "5th rank", years: "2024" },
    { school: "Sagar Public School", detail: "Class X", score: "97.2%", note: "Topper", years: "2022" },
  ],
  achievements: [
    { title: "Zee TV national quiz \u201CMind Wars\u201D", body: "Selected for the national quiz program.", year: "2019" },
    { title: "WWF Wide Wisdom Quiz, Regional (MP & CG)", body: "Second position.", year: "2019" },
    { title: "State Road Safety Debate", body: "Second position, felicitated by the State Transport Minister.", year: "2019" },
    { title: "SOF International GK Olympiad", body: "Certificate of Zonal Excellence and Medal of Distinction.", year: "2019 to 2020" },
    { title: "Smart India Hackathon, internal round", body: "Led Team Trailblazer (Project ID 25137) with \u201CTravelogue,\u201D a tourism app. Cleared Hack-O-Sprint 3.0 at IIIT Bhopal and advanced to the national-stage submission.", year: "2025" },
  ],
  leadership: [
    { title: "Co-coordinator, Shankh", body: "Editorial planning, contributor outreach and publication deadlines for the IIIT Bhopal college magazine.", year: "2026 to 2027" },
    { title: "Author, poet philosopher", body: "Long-form essays on philosophy, political history and culture.", year: "Ongoing" },
    { title: "Personal investing", body: "A mutual fund SIP portfolio on Groww across domestic equity, international equity, gold and arbitrage funds, built for non-correlated returns.", year: "Ongoing" },
  ],
  skills: [
    { group: "Finance", items: "Excel (formula-driven financial models), DCF and LBO modelling, trading comps, sensitivity analysis, football field, IC memos, derivatives pricing, credit risk analysis" },
    { group: "Languages and tools", items: "Python 3 (pandas, NumPy, Plotly, Streamlit, yfinance, pytest), C++17/20, SQL, FRED API, Git and GitHub Actions" },
  ],
};
