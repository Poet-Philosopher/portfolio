import fallbackJson from "@/data/writing-fallback.json";
import { writingConfig } from "@/data/writing";
import { fetchFeed } from "@/lib/feed";
import type { Channel, Essay, WritingData } from "@/lib/types";
import { firstSentence } from "@/lib/text";

interface Snapshot {
  syncedAt: string;
  channel: Channel;
  essays: Essay[];
}

export async function getWriting(): Promise<WritingData> {
  try {
    const live = await fetchFeed();
    if (live.essays.length === 0) throw new Error("Feed returned no essays");
    return {
      channel: {
        tagline: live.channel.tagline || writingConfig.tagline,
        imageUrl: live.channel.imageUrl || writingConfig.channelImage,
      },
      essays: live.essays,
      syncedAt: new Date().toISOString(),
      source: "live",
    };
  } catch (error) {
    console.warn("[writing] live feed unavailable, using snapshot:", error);
    const snap = fallbackJson as unknown as Snapshot;
    return {
      channel: {
        tagline: snap.channel?.tagline || writingConfig.tagline,
        imageUrl: snap.channel?.imageUrl || writingConfig.channelImage,
      },
      essays: snap.essays ?? [],
      syncedAt: snap.syncedAt,
      source: "fallback",
    };
  }
}

/** Order for the grid: pinned slugs first (in the order listed), then by date. */
export function orderEssays(essays: Essay[], pinned: string[]): { essay: Essay; pinned: boolean }[] {
  const pinnedSet = new Set(pinned);
  const pinnedEssays = pinned
    .map((slug) => essays.find((e) => e.slug === slug))
    .filter((e): e is Essay => Boolean(e));
  const rest = essays.filter((e) => !pinnedSet.has(e.slug));
  return [
    ...pinnedEssays.map((essay) => ({ essay, pinned: true })),
    ...rest.map((essay) => ({ essay, pinned: false })),
  ];
}

/** One sentence from a recent essay's description. Re-picked whenever the page regenerates. */
export function pickEpigraph(essays: Essay[]): { text: string; essay: Essay } | null {
  const candidates = essays
    .slice(0, 6)
    .map((essay) => ({ essay, text: firstSentence(essay.subtitle) ?? "" }))
    .filter((c) => c.text.length >= 40 && c.text.length <= 180);
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
