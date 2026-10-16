"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/format";
import type { Essay } from "@/lib/types";

interface Item {
  essay: Essay;
  pinned: boolean;
}

export function EssayBrowser({ items, tags, gridSize }: { items: Item[]; tags: string[]; gridSize: number }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtering = query.trim() !== "" || tag !== null;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = items.filter(({ essay }) => {
      if (tag && !essay.categories.includes(tag)) return false;
      if (!q) return true;
      return `${essay.title} ${essay.subtitle} ${essay.categories.join(" ")}`.toLowerCase().includes(q);
    });
    return filtering ? matched : matched.slice(0, gridSize);
  }, [items, query, tag, filtering, gridSize]);

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h3 className="font-serif text-2xl">More essays</h3>
        <div className="md:w-72">
          <label htmlFor="essay-search" className="font-sans text-xs text-muted">Search essays</label>
          <input
            id="essay-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, subject or tag"
            className="mt-1 w-full rounded-sm border border-ink/40 bg-paper px-3 py-2 font-sans text-sm placeholder:text-muted"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter essays by tag">
          <Chip active={tag === null} onClick={() => setTag(null)}>All</Chip>
          {tags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>{t}</Chip>
          ))}
        </div>
      )}

      <p className="mt-4 font-sans text-xs text-muted" aria-live="polite">
        {filtering ? `${results.length} ${results.length === 1 ? "essay matches" : "essays match"}` : `Showing ${results.length} of ${items.length}`}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 max-w-prose">No essay matches that search. Clear the search or pick another tag.</p>
      ) : (
        <ul className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ essay, pinned }) => (
            <li key={essay.slug} className="flex flex-col border-t border-ink/25 pt-4">
              {essay.image && (
                <Image src={essay.image} alt="" width={640} height={400} unoptimized loading="lazy" className="mb-4 aspect-[16/10] w-full border border-ink/15 object-cover" />
              )}
              <p className="font-sans text-xs text-muted">
                {pinned && <span className="mr-2 font-medium text-accent">Pinned</span>}
                <time dateTime={essay.date}>{formatDate(essay.date)}</time>
                {essay.readingMinutes > 0 && <span className="ml-2 font-mono">{essay.readingMinutes} min</span>}
              </p>
              <h4 className="mt-1 font-serif text-xl leading-snug">{essay.title}</h4>
              {essay.subtitle && <p className="mt-2 line-clamp-3 text-[0.95rem] text-muted">{essay.subtitle}</p>}
              {essay.categories.length > 0 && (
                <p className="mt-2 font-mono text-xs text-muted">{essay.categories.slice(0, 3).join(", ")}</p>
              )}
              <a href={essay.link} target="_blank" rel="noopener noreferrer" className="link mt-3 self-start font-sans text-sm">
                Read on Substack<span className="sr-only">: {essay.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-sans text-xs transition-colors ${active ? "border-ink bg-ink text-paper" : "border-ink/40 text-ink hover:border-accent hover:text-accent"}`}
    >
      {children}
    </button>
  );
}
