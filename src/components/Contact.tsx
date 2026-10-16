import { profile } from "@/data/profile";
import { writingConfig } from "@/data/writing";
import { Section, SectionHeading } from "@/components/Section";

export function Contact() {
  const rows = [
    { label: "Email", href: `mailto:${profile.email}`, text: profile.email },
    { label: "LinkedIn", href: profile.links.linkedin, text: "abhimanyu-patel-iiitb" },
    { label: "GitHub", href: profile.links.github, text: "Poet-Philosopher" },
    { label: "Substack", href: profile.links.substack, text: `${writingConfig.displayName} (${writingConfig.handle})` },
  ];
  return (
    <Section id="contact">
      <SectionHeading id="contact" title="Contact">
        A note about an internship, a model or an essay is welcome.
      </SectionHeading>
      <dl className="max-w-2xl divide-y divide-rule border-y border-ink/25">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-4 sm:gap-4">
            <dt className="font-sans text-sm text-muted">{r.label}</dt>
            <dd className="sm:col-span-3">
              <a href={r.href} className="link text-lg" {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {r.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
