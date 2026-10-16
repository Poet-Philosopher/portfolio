import type { ReactNode } from "react";

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-14 border-t border-rule py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  children,
  lead,
}: {
  id: string;
  title: string;
  children?: ReactNode;
  /** Optional element shown beside the heading, such as an avatar. */
  lead?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-4">
        {lead}
        <h2 id={`${id}-title`} className="font-serif text-4xl font-light tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      {children && <p className="mt-4 max-w-prose font-serif text-lg italic text-muted">{children}</p>}
    </div>
  );
}
