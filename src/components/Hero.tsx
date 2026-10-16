import { profile } from "@/data/profile";
import { writingConfig } from "@/data/writing";
import type { Essay } from "@/lib/types";
import { CountUp } from "@/components/CountUp";
import { WordReveal } from "@/components/WordReveal";

export function Hero({ latest }: { latest: Essay | null }) {
  const f = profile.ledgerFigures;
  const a = writingConfig.audience;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pb-20 pt-14 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="font-serif text-[clamp(3.25rem,10vw,7.5rem)] font-light leading-[0.94] tracking-tight">
            Abhimanyu
            <br />
            Patel
          </h1>
          <p className="mt-6 font-sans text-sm text-muted">{profile.roleLine}</p>
          <WordReveal text={profile.positioning} className="mt-8 max-w-[34ch] font-serif text-2xl leading-snug md:text-3xl" />
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-solid">Projects</a>
            <a href="#writing" className="btn btn-line">Writing</a>
            <a href={profile.resumeHref} download className="btn btn-line">Resume (PDF)</a>
          </div>
        </div>

        {/* Signature: a two-column ledger. Left is what I compute, right is what I compose. */}
        <div className="lg:col-span-5">
          <div role="group" aria-label="A ledger with two columns: work I compute and work I compose" className="border border-ink/25 bg-surface">
            <div className="grid grid-cols-2 border-b border-ink/25 font-sans text-sm text-muted">
              <div className="px-4 py-2.5">Computed</div>
              <div className="ledger-divide px-4 py-2.5">Composed</div>
            </div>

            <div className="grid grid-cols-2">
              <Cell>
                <Figure><CountUp to={f.banks.value} delay={0.2} /></Figure>
                <Label>banks benchmarked across 4 loan types</Label>
              </Cell>
              <Cell divide>
                <Figure><CountUp to={a.subscribers.value} suffix={a.subscribers.suffix} delay={0.2} /></Figure>
                <Label>subscribers to poet philosopher</Label>
              </Cell>
            </div>
            <div className="grid grid-cols-2 border-t border-rule">
              <Cell>
                <Figure><CountUp to={f.cpse.value} delay={0.45} /></Figure>
                <Label>public-sector bond issuers tracked</Label>
              </Cell>
              <Cell divide>
                <Figure>
                  <CountUp to={a.followers.value} decimals={a.followers.decimals} suffix={a.followers.suffix} delay={0.45} />
                </Figure>
                <Label>followers on Substack</Label>
              </Cell>
            </div>
            <div className="grid grid-cols-2 border-t border-rule">
              <Cell>
                <Figure><CountUp to={f.tests.value} delay={0.7} /></Figure>
                <Label>automated tests behind one loan model</Label>
              </Cell>
              <Cell divide>
                {latest ? (
                  <>
                    <p className="font-sans text-xs text-muted">Latest essay</p>
                    <a href={latest.link} target="_blank" rel="noopener noreferrer" className="link mt-1 block font-serif text-lg italic leading-snug">
                      {latest.title}
                    </a>
                  </>
                ) : (
                  <>
                    <p className="font-sans text-xs text-muted">Essays on</p>
                    <p className="mt-1 font-serif text-lg italic leading-snug">philosophy, political history and culture</p>
                  </>
                )}
              </Cell>
            </div>
          </div>
          <p className="mt-3 font-sans text-xs text-muted">The last entry on the right updates itself from the newsletter.</p>
        </div>
      </div>
    </section>
  );
}

function Cell({ children, divide = false }: { children: React.ReactNode; divide?: boolean }) {
  return <div className={`p-4 ${divide ? "ledger-divide" : ""}`}>{children}</div>;
}
function Figure({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-3xl font-medium md:text-4xl">{children}</p>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 font-sans text-sm leading-snug text-muted">{children}</p>;
}
