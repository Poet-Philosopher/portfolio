import type { Count } from "@/data/writing";

/*
  Hero positioning options. Change `heroIndex` to switch.

  0. "I model markets and write essays. Both begin by asking what a thing is actually worth."
  1. "A poet's heart, a philosopher's mind, and a jack-of-all-trades' curiosity."   (my Substack tagline)
  2. "I build pricing models and read philosophy, because both are about what survives scrutiny."
*/
export const heroOptions = [
  "I model markets and write essays. Both begin by asking what a thing is actually worth.",
  "A poet's heart, a philosopher's mind, and a jack-of-all-trades' curiosity.",
  "I build pricing models and read philosophy, because both are about what survives scrutiny.",
];
export const heroIndex = 0;

export const profile = {
  name: "Abhimanyu Patel",
  email: "patelabhimanyu54@gmail.com",
  roleLine: "B.Tech Computer Science at IIIT Bhopal. CFA Level 1 candidate, February 2027.",
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
    "I study computer science at IIIT Bhopal and I am working toward roles in finance, quant and fintech. I am registered for the CFA Program and sit Level 1 in February 2027.",
    "Most of what I build starts as a question about money: what a loan really costs when the repo rate moves, what a currency should be worth, which public-sector issuer is carrying risk. I write the answer as code and test it until it stops surprising me.",
    "The other half of my work is writing. poet philosopher, my newsletter, covers philosophy, political history and culture, and has 1000+ subscribers. Writing taught me what a model cannot: an argument has to survive a reader who disagrees. A good model and a good essay fail the same way, by hiding their assumptions, so I try to put mine on the page.",
    "I also co-coordinate Shankh, the IIIT Bhopal college magazine.",
  ],
  /** Hero ledger. Left column is computed work, right column is composed work. */
  ledgerFigures: {
    banks: { value: 7 } satisfies Count,
    cpse: { value: 37 } satisfies Count,
    tests: { value: 83 } satisfies Count,
  },
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
    { group: "Languages", items: "C, C++17/20, Python 3, JavaScript (ES6+), HTML5, CSS3" },
    { group: "Data and web tools", items: "Streamlit, Flask, pandas, NumPy, Plotly, SQL, PostgreSQL, yfinance, pytest, Playwright" },
    { group: "Workflow", items: "Git, GitHub, GitHub Actions, VS Code, XAMPP" },
    { group: "APIs and AI", items: "FRED API, Groq API (Llama 3.3 70B), Anthropic Claude API, python-dotenv" },
    { group: "Quant and fintech", items: "Options pricing (Black-Scholes, Greeks, Monte Carlo), algorithmic backtesting, financial modelling, loan and EMI modelling, API data integration" },
    { group: "Finance", items: "Mutual fund analysis, SIP portfolio management, STCG/LTCG taxation, market research, DCF valuation, sensitivity analysis" },
    { group: "Computer science", items: "Data structures and algorithms, OOP, DBMS, computer networks, compiler design" },
  ],
};
