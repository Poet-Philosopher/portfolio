import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { SiteHeader } from "@/components/SiteHeader";
import { Writing } from "@/components/Writing";
import { getWriting } from "@/lib/writing";

// ISR: the page (and the Substack and GitHub data in it) regenerates at most once an hour.
// Must be a literal. Keep in step with writingConfig.revalidate.
export const revalidate = 3600;

export default async function Home() {
  const writing = await getWriting();
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative z-10">
        <Hero latest={writing.essays[0] ?? null} />
        <About />
        <Projects />
        <Research />
        <Writing data={writing} />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
