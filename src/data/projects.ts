export type ProjectGroup = "quant" | "craft";

export interface Project {
  slug: string;
  title: string;
  group: ProjectGroup;
  period?: string;
  /** One-line reflective epigraph. Edit freely. */
  epigraph: string;
  problem: string;
  built: string;
  details: string[];
  stack: string[];
  liveUrl: string;
  /** GitHub repo name under Poet-Philosopher. Verify these match your real repo names. */
  repo?: string;
  /** Streamlit free-tier apps sleep; shows the wake-up note. */
  sleeps?: boolean;
}

export const groups: { id: ProjectGroup; title: string; blurb: string }[] = [
  { id: "quant", title: "Quant & Finance", blurb: "Models that price, benchmark and monitor. Each one ships with tests or a live data feed." },
  { id: "craft", title: "Craft & Letters", blurb: "Small tools for people who care about sentences." },
];

export const projects: Project[] = [
  {
    slug: "options-pricing-greeks-lab",
    title: "Options Pricing & Greeks Lab",
    group: "quant",
    period: "Oct 2026",
    epigraph: "A price is an opinion about the future, stated as a formula.",
    problem: "Option prices are easy to read off a screen and hard to understand. This lab makes the machinery visible, from the closed form to the simulation.",
    built: "An interactive analytics platform that prices European options under Black-Scholes-Merton and computes Delta, Gamma, Vega, Theta and Rho.",
    details: [
      "Implied volatility solver using Newton-Raphson with a bisection fallback, plus a volatility-smile view, with safeguards for deep in-the-money, out-of-the-money and sub-intrinsic prices.",
      "Monte Carlo engine (antithetic variates, standard error, confidence intervals) and a Cox-Ross-Rubinstein binomial engine for Asian and American options, benchmarked against Black-Scholes for convergence.",
      "Strategy builder with payoff and P&L diagrams, breakevens and maximum profit and loss for spreads, straddles, strangles and iron condors, with a Nifty 50 index option preset.",
      "Automated pytest suite covering put-call parity, finite-difference Greeks and implied volatility round-trips. Deployed on Streamlit Community Cloud with a GitHub Actions keep-alive.",
    ],
    stack: ["Python", "Streamlit", "pytest", "GitHub Actions"],
    liveUrl: "https://options-pricing-greeks-lab-bs66px3bvtzulfgs6ecmdm.streamlit.app/",
    repo: "options-pricing-greeks-lab",
    sleeps: true,
  },
  {
    slug: "repo-rate-loan-impact",
    title: "Repo Rate & Loan Impact",
    group: "quant",
    period: "Oct 2026",
    epigraph: "A small change in the rate, compounded over years, is a large decision.",
    problem: "Borrowers hear that the repo rate moved but not what it does to their own EMI. This app turns a policy rate into a number a borrower can plan around.",
    built: "A three-tab fintech app that estimates a borrower\u2019s interest rate, EMI and total interest from CIBIL score, bank, loan type, amount and tenure.",
    details: [
      "Floating-rate pricing model: repo rate plus bank spread plus CIBIL risk premium, benchmarking 7 banks across 4 loan types and ranking them by total interest cost.",
      "Repo-rate sensitivity engine (3% to 9%) showing before and after EMI and interest, with a \u201Csame EMI\u201D mode that solves the revised tenure using the logarithmic tenure formula.",
      "EMI calculator with yearly and monthly amortization schedules, interactive Plotly charts and CSV export, handling 0% interest and non-whole-year tenures.",
      "83 automated pytest tests (EMI against known values, schedules summing to principal, zero final balance, CIBIL band boundaries) and a Playwright uptime script on a scheduled GitHub Actions workflow.",
    ],
    stack: ["Python", "Streamlit", "Plotly", "pytest", "Playwright", "GitHub Actions"],
    liveUrl: "https://repo-rate-loan-impact-jsfebchzqxbfmnduqedckk.streamlit.app/",
    repo: "repo-rate-loan-impact",
    sleeps: true,
  },
  {
    slug: "currency-fair-value-dashboard",
    title: "Currency Fair Value Dashboard",
    group: "quant",
    period: "Sep 2026",
    epigraph: "A currency is a promise; purchasing power is how far it carries.",
    problem: "Spot rates say what a currency costs today, not what it should cost. The dashboard measures the gap.",
    built: "An open-source dashboard that quantifies how far Forex rates deviate from fundamental value, built on Purchasing Power Parity.",
    details: [
      "Benchmarks live spot rates against PPP-implied fair value to flag over- and under-valued currencies.",
      "Live data pipeline combining the FRED API (macroeconomic series) and yfinance (FX spot rates), with pandas and NumPy transformations and interactive Plotly charts for reproducible analysis.",
      "Deployed as a Streamlit web app, from quantitative model to full release.",
    ],
    stack: ["Python 3", "pandas", "NumPy", "Plotly", "FRED API", "yfinance", "Streamlit"],
    liveUrl: "https://currency-fair-value-dashboard-uvjxtvxezq77xuytxxlvt5.streamlit.app/",
    repo: "currency-fair-value-dashboard",
    sleeps: true,
  },
  {
    slug: "cpse-bond-credit-risk",
    title: "CPSE Bond Credit Risk Platform",
    group: "quant",
    period: "2026",
    epigraph: "Credit is trust, priced and written down.",
    problem: "Public-sector debt is often assumed safe. The platform screens that assumption issuer by issuer.",
    built: "A credit risk intelligence platform tracking 37 active bond-issuing Central Public Sector Enterprises (CPSEs).",
    details: [
      "Risk evaluation module with issuer-level project lookups to assess capital structure stability and credit quality across state-owned debt.",
      "Primary-market pipeline tracker for upcoming bond issuances, categorising listing status across debt and equity markets for early-stage screening.",
      "Macro-level credit signals across the CPSE bond universe, using structured frameworks for sovereign-linked default risk and issuer liquidity.",
    ],
    stack: ["Python", "Streamlit"],
    liveUrl: "https://cpse-bond-monitor-5tja7mem5nbjmlr7rjbafn.streamlit.app/",
    repo: "cpse-bond-monitor",
    sleeps: true,
  },
  {
    slug: "quantitative-portfolio-engine",
    title: "Quantitative Portfolio Engine",
    group: "quant",
    period: "2025",
    epigraph: "Discipline is the position you hold when the market invites you to leave.",
    problem: "A personal portfolio spread across SIPs, debt and ETFs is hard to read as one thing. The engine keeps one honest set of books.",
    built: "An automated portfolio dashboard that tracks live NAV feeds across equity, debt and ETF allocations.",
    details: [
      "Buy / Hold / Exit signalling and an automated STCG / LTCG tax estimator.",
      "Realized P&L and Yield to Maturity calculations that resolve data conflicts across overlapping SIP cycles.",
      "An AI market-analyst module (Llama 3.3 70B) for macro insights, plus automated daily performance alerts to monitor asset-liability alignment.",
    ],
    stack: ["Python", "yfinance", "Streamlit", "Groq API (Llama 3.3 70B)"],
    liveUrl: "https://quantitative-portfolio-engine-79yyh8ysmkat9qbp3g4pkt.streamlit.app/",
    repo: "quantitative-portfolio-engine",
    sleeps: true,
  },
  {
    slug: "punctuation-quiz",
    title: "Punctuation Quiz",
    group: "craft",
    epigraph: "A comma is a breath you decide to allow.",
    problem: "Punctuation is learned by practice, not by rules read once.",
    built: "A quiz for practising punctuation, made as a tool for writers.",
    details: [],
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://punctuation-quiz.vercel.app/",
    repo: "punctuation-quiz",
  },
  {
    slug: "the-quiet-hour",
    title: "The Quiet Hour",
    group: "craft",
    epigraph: "Eight doors, one lamp, and a shelf of authors who got there first.",
    problem: "Personality quizzes sort you into a type. This one sorts you into a reading list.",
    built: "An eight-question quiz that weighs your answers against eight classic authors, then explains why that author found you and what their style and philosophy offer.",
    details: [],
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://the-quiet-hour.vercel.app/",
    repo: "the-quiet-hour-quiz",
  },
];
