export interface Count {
  value: number;
  decimals?: number;
  suffix?: string;
}

export const writingConfig = {
  /** Always shown exactly like this. */
  displayName: "poet philosopher",
  handle: "@thepoeticgeneralist",
  baseUrl: (process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "https://thepoeticgeneralist.substack.com").replace(/\/+$/, ""),

  /** Used if the feed has no <description>. */
  tagline: "A poet's heart, a philosopher's mind, and a jack-of-all-trades' curiosity.",
  /** Used if the feed has no <image><url>. Leave null to show a monogram seal. */
  channelImage: null as string | null,

  /**
   * Post slugs to pin above date order in the grid.
   * The slug is the last part of the post URL: substack.com/p/<slug>
   */
  pinned: [] as string[],

  /** RSS does not expose audience size, so edit these by hand. */
  audience: {
    subscribers: { value: 1000, suffix: "+" } satisfies Count,
    followers: { value: 1.5, decimals: 1, suffix: "k+" } satisfies Count,
  },

  /** Seconds. Also set as `export const revalidate` in app/page.tsx (it must be a literal there). */
  revalidate: 3600,
  /** Essays shown in the grid before a filter or search is used. */
  gridSize: 8,
  showEmbed: process.env.NEXT_PUBLIC_SUBSTACK_EMBED === "true",
};
