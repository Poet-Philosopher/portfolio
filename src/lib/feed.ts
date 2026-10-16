import Parser from "rss-parser";
import { writingConfig } from "@/data/writing";
import type { Essay, FeedResult } from "@/lib/types";
import { firstImage, readingMinutes, stripHtml, truncate } from "@/lib/text";

/**
 * Substack's feed mixes the content, dc, itunes and atom namespaces.
 * rss-parser already exposes enclosure (item.enclosure.url), dc:creator
 * (item.creator) and <category> (item.categories); the custom fields below
 * make the other two explicit: the full HTML body and the raw description.
 */
type ItemExtra = { contentEncoded?: string; descriptionRaw?: string };

const parser = new Parser<Record<string, unknown>, ItemExtra>({
  timeout: 10_000,
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["description", "descriptionRaw"],
    ],
  },
});

function slugOf(link: string): string {
  try {
    return new URL(link).pathname.split("/").filter(Boolean).pop() ?? link;
  } catch {
    return link;
  }
}

export function parseFeedXml(xml: Promise<string> | string): Promise<FeedResult> {
  return Promise.resolve(xml).then(async (text) => {
    const feed = await parser.parseString(text);

    const essays: Essay[] = [];
    for (const item of feed.items) {
      if (!item.link || !item.title) continue;
      const body = item.contentEncoded ?? "";
      const bodyText = stripHtml(body);
      const subtitle = truncate(stripHtml(item.descriptionRaw ?? ""), 240);
      const enclosure = item.enclosure?.url;
      const enclosureIsImage = enclosure && (!item.enclosure?.type || item.enclosure.type.startsWith("image/"));
      const parsed = item.isoDate ?? (item.pubDate ? new Date(item.pubDate).toISOString() : "");

      essays.push({
        slug: slugOf(item.link),
        title: stripHtml(item.title),
        link: item.link,
        date: parsed,
        subtitle,
        // Short teaser only. Full essay text is never stored or shown.
        excerpt: subtitle || truncate(bodyText, 200),
        image: (enclosureIsImage ? enclosure : null) ?? firstImage(body),
        categories: (item.categories ?? []).map((c) => stripHtml(String(c))).filter(Boolean),
        readingMinutes: readingMinutes(bodyText),
      });
    }
    essays.sort((a, b) => (a.date < b.date ? 1 : -1));

    return {
      channel: {
        tagline: feed.description ? stripHtml(feed.description) : null,
        imageUrl: feed.image?.url ?? null,
      },
      essays,
    };
  });
}

export async function fetchFeed(revalidate: number = writingConfig.revalidate): Promise<FeedResult> {
  const res = await fetch(`${writingConfig.baseUrl}/feed`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-feed/1.0)",
      Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
    },
    next: { revalidate },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Feed responded with ${res.status}`);
  return parseFeedXml(res.text());
}
