import { research } from "@/data/research";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export function Research() {
  return (
    <Section id="research">
      <SectionHeading id="research" title="Research">
        A market study for Finlatics, written as a strategy memo.
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h3 className="font-serif text-2xl leading-snug">{research.title}</h3>
            <dl className="mt-5 space-y-1 font-sans text-sm text-muted">
              <div><dt className="sr-only">Role</dt><dd className="text-ink">{research.role}</dd></div>
              <div><dt className="sr-only">Organisation</dt><dd>{research.org}</dd></div>
              <div><dt className="sr-only">Period</dt><dd className="font-mono text-xs">{research.period}</dd></div>
            </dl>
            <p className="mt-5 text-[0.97rem]">{research.summary}</p>


            <a href={research.download.href} download className="btn btn-solid mt-6">{research.download.label}</a>
            <p className="mt-4 font-sans text-xs text-muted">{research.mentorship}</p>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-rule border-y border-ink/25">
            {research.findings.map((f) => (
              <li key={f.title}>
                <Reveal className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                  <h4 className="font-serif text-xl leading-snug md:col-span-5">{f.title}</h4>
                  <p className="text-[0.97rem] md:col-span-7">{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <h4 className="font-serif text-2xl">The Care Moat framework</h4>
            <p className="mt-2 max-w-prose font-sans text-sm text-muted">{research.careMoat.intro}</p>
            <ol className="mt-6 grid border border-ink/25 bg-surface md:grid-cols-3">
              {research.careMoat.steps.map((s, i) => (
                <li key={s.label} className={`p-5 ${i > 0 ? "border-t border-rule md:border-l md:border-t-0" : ""}`}>
                  <p className="font-sans text-sm font-medium text-accent">{s.label}</p>
                  <p className="mt-1 text-[0.97rem]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
