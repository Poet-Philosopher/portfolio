import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Abhimanyu Patel is a B.Tech CSE student at IIIT Bhopal and CFA Level 1 candidate building toward quant and fintech roles. He writes poet philosopher, a newsletter on philosophy, political history and culture.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Abhimanyu Patel | Quant, fintech and essays", template: "%s | Abhimanyu Patel" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Abhimanyu Patel", description, type: "website", url: siteUrl, siteName: "Abhimanyu Patel" },
  twitter: { card: "summary_large_image", title: "Abhimanyu Patel", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECEFEA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1317" },
  ],
};

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIIT Bhopal" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.substack],
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-paper">
          Skip to content
        </a>
        <div aria-hidden="true" className="ledger-margin" />
        {children}
      </body>
    </html>
  );
}
