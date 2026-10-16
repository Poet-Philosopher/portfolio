import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeading id="credentials" title="Credentials & Highlights" />

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-7">
          <Reveal>
            <h3 className="font-serif text-2xl">Qualification</h3>
            <div className="mt-4 border-y border-ink/25 py-4">
              <p className="font-serif text-xl">CFA Program, Level 1 candidate</p>
              <p className="font-sans text-sm text-muted">Registered with CFA Institute. Target exam date: February 2027.</p>
            </div>
          </Reveal>

          <Reveal>
            <h3 className="font-serif text-2xl">Education</h3>
            <div className="mt-4 divide-y divide-rule border-y border-ink/25">
              {profile.education.map((e) => (
                <div key={e.school} className="grid gap-1 py-4 sm:grid-cols-12 sm:gap-4">
                  <div className="sm:col-span-7">
                    <p className="font-serif text-lg leading-snug">{e.school}</p>
                    <p className="font-sans text-sm text-muted">{e.detail}</p>
                  </div>
                  <p className="font-mono text-sm sm:col-span-3">{e.score}<span className="block font-sans text-xs text-muted">{e.note}</span></p>
                  <p className="font-mono text-xs text-muted sm:col-span-2 sm:text-right">{e.years}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h3 className="font-serif text-2xl">Quizzing, debate and hackathons</h3>
            <ul className="mt-4 divide-y divide-rule border-y border-ink/25">
              {profile.achievements.map((a) => (
                <li key={a.title} className="grid gap-1 py-4 sm:grid-cols-12 sm:gap-4">
                  <div className="sm:col-span-10">
                    <p className="font-serif text-lg leading-snug">{a.title}</p>
                    <p className="text-[0.95rem] text-muted">{a.body}</p>
                  </div>
                  <p className="font-mono text-xs text-muted sm:col-span-2 sm:text-right">{a.year}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-14 lg:col-span-5">
          <Reveal>
            <h3 className="font-serif text-2xl">Leadership and practice</h3>
            <ul className="mt-4 divide-y divide-rule border-y border-ink/25">
              {profile.leadership.map((l) => (
                <li key={l.title} className="py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-serif text-lg leading-snug">{l.title}</p>
                    <p className="shrink-0 font-mono text-xs text-muted">{l.year}</p>
                  </div>
                  <p className="mt-1 text-[0.95rem] text-muted">{l.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h3 className="font-serif text-2xl">Skills</h3>
            <dl className="mt-4 divide-y divide-rule border-y border-ink/25">
              {profile.skills.map((s) => (
                <div key={s.group} className="py-3">
                  <dt className="font-sans text-sm font-medium">{s.group}</dt>
                  <dd className="mt-0.5 font-mono text-xs leading-relaxed text-muted">{s.items}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
