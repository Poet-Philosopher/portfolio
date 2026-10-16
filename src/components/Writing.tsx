import Image from "next/image";
import { writingConfig } from "@/data/writing";
import { formatDate, formatStamp } from "@/lib/format";
import type { WritingData } from "@/lib/types";
import { orderEssays, pickEpigraph } from "@/lib/writing";
import { CountUp } from "@/components/CountUp";
import { EssayBrowser } from "@/components/EssayBrowser";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export function Writing({ data }: { data: WritingData }) {
  const { essays, channel } = data;
  const feature = essays[0] ?? null;
  const rest = orderEssays(essays.slice(1), writingConfig.pinned);
  const tags = Array.from(new Set(essays.flatMap((e) => e.categories))).sort((a, b) => a.localeCompare(b));
  const epigraph = pickEpigraph(essays);
  const live = data.source === "live";

  const seal = channel.imageUrl ? (
    <Image src={channel.imageUrl} alt="poet philosopher channel image" width={56} height={56} unoptimized className="h-14 w-14 rounded-full border border-ink/25 object-cover" />
  ) : (
    <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/25 font-serif text-xl italic">pp</span>
  );

  return (
    <Section id="writing">
      <SectionHeading id="writing" title={writingConfig.displayName} lead={seal}>
        {channel.tagline}
      </SectionHeading>

      <p className="-mt-6 mb-10 flex items-center gap-2 font-sans text-xs text-muted" role="status">
        <span className={`inline-block h-2 w-2 rounded-full ${live ? "bg-ok" : "bg-accent"}`} aria-hidden="true" />
        {live ? "Live from Substack." : "Showing the saved snapshot; the live feed is unreachable."} Last synced {formatStamp(data.syncedAt)}.
      </p>

      {feature ? (
        <Reveal>
          <article className="grid gap-8 border-y border-ink/25 py-10 md:grid-cols-12 md:gap-10">
            {feature.image && (
              <div className="md:col-span-5">
                <Image src={feature.image} alt={`Cover image for ${feature.title}`} width={800} height={520} unoptimized className="aspect-[16/10] w-full border border-ink/20 object-cover" />
              </div>
            )}
            <div className={feature.image ? "md:col-span-7" : "md:col-span-12 md:max-w-[62ch]"}>
              <p className="font-sans text-sm text-muted">
                Latest essay, <time dateTime={feature.date}>{formatDate(feature.date)}</time>
                {feature.readingMinutes > 0 && <span className="font-mono text-xs"> {feature.readingMinutes} min read</span>}
              </p>
              <h3 className="hang-quote mt-3 font-serif text-3xl font-light leading-tight md:text-4xl">{feature.title}</h3>
              {feature.excerpt && <p className="drop-cap mt-5 max-w-[60ch] text-lg">{feature.excerpt}</p>}
              <a href={feature.link} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-6">
                Read on Substack<span className="sr-only">: {feature.title}</span>
              </a>
            </div>
          </article>
        </Reveal>
      ) : (
        <div className="border-y border-ink/25 py-10">
          <p className="max-w-prose">The essays live on Substack. The list will appear here once the feed has been read.</p>
          <a href={writingConfig.baseUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-5">Open poet philosopher on Substack</a>
        </div>
      )}

      {rest.length > 0 && <EssayBrowser items={rest} tags={tags} gridSize={writingConfig.gridSize} />}

      {epigraph && (
        <figure className="mt-16 border-l-[3px] border-double border-accent/65 pl-6">
          <blockquote className="hang-quote max-w-[44ch] font-serif text-2xl italic leading-snug">{`\u201C${epigraph.text}\u201D`}</blockquote>
          <figcaption className="mt-2 font-sans text-sm text-muted">
            From{" "}
            <a href={epigraph.essay.link} target="_blank" rel="noopener noreferrer" className="link">{epigraph.essay.title}</a>
          </figcaption>
        </figure>
      )}

      <Subscribe />
    </Section>
  );
}

function Subscribe() {
  const { audience, baseUrl, displayName, handle, showEmbed } = writingConfig;
  return (
    <div className="mt-16 grid gap-8 border border-ink/25 bg-surface p-6 md:grid-cols-12 md:p-8">
      <div className="md:col-span-7">
        <h3 className="font-serif text-2xl">Subscribe to {displayName}</h3>
        <p className="mt-2 max-w-prose text-[0.97rem]">Essays on philosophy, political history and culture, sent when they are ready.</p>
        <dl className="mt-5 flex gap-10">
          <div>
            <dt className="font-sans text-xs text-muted">Subscribers</dt>
            <dd className="font-mono text-2xl"><CountUp to={audience.subscribers.value} suffix={audience.subscribers.suffix} /></dd>
          </div>
          <div>
            <dt className="font-sans text-xs text-muted">Followers</dt>
            <dd className="font-mono text-2xl"><CountUp to={audience.followers.value} decimals={audience.followers.decimals} suffix={audience.followers.suffix} /></dd>
          </div>
        </dl>
      </div>
      <div className="md:col-span-5">
        {showEmbed ? (
          <iframe src={`${baseUrl}/embed`} title={`Subscribe to ${displayName}`} className="h-[150px] w-full border border-ink/25 bg-white" loading="lazy" />
        ) : (
          <form action={`${baseUrl}/subscribe`} method="get" target="_blank" className="flex flex-col gap-3">
            <label htmlFor="sub-email" className="font-sans text-sm">Email address</label>
            <input id="sub-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="rounded-sm border border-ink/40 bg-paper px-3 py-2.5 font-sans text-sm placeholder:text-muted focus-visible:outline-accent" />
            <button type="submit" className="btn btn-solid">Subscribe on Substack</button>
            <p className="font-sans text-xs text-muted">Opens Substack to confirm. Follow {handle} there too.</p>
          </form>
        )}
      </div>
    </div>
  );
}
