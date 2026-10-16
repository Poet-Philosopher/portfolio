export interface Essay {
  slug: string;
  title: string;
  link: string;
  /** ISO 8601 */
  date: string;
  subtitle: string;
  excerpt: string;
  image: string | null;
  categories: string[];
  readingMinutes: number;
}

export interface Channel {
  tagline: string | null;
  imageUrl: string | null;
}

export interface FeedResult {
  channel: Channel;
  essays: Essay[];
}

export interface WritingData {
  channel: { tagline: string; imageUrl: string | null };
  essays: Essay[];
  /** ISO 8601 time of the last successful sync */
  syncedAt: string;
  source: "live" | "fallback";
}
