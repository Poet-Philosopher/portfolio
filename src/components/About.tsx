import Image from "next/image";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export function About() {
  return (
    <Section id="about">
      <SectionHeading id="about" title="About" />
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="space-y-5 md:col-span-8 md:max-w-[62ch]">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        {profile.headshot && (
          <div className="md:col-span-4">
            <Image src={profile.headshot} alt="Portrait of Abhimanyu Patel" width={480} height={600} className="h-auto w-full max-w-xs border border-ink/25 object-cover" />
          </div>
        )}
      </div>
    </Section>
  );
}
